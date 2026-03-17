import List "mo:core/List";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Prim "mo:prim";
import AccessControl "authorization/access-control";

actor {
  // Hardcoded admins - persists across all deployments
  let HARDCODED_ADMIN : Principal = Principal.fromText("dqh23-wjelb-pzhld-tktkj-ksxth-hyaog-qwml4-cfbmc-os5oy-vrddu-aae");
  let HARDCODED_ADMIN_2 : Principal = Principal.fromText("w2pbq-foiwn-khcpr-swco6-r4ens-46xql-cya3e-bdgqv-pn72j-nqcma-lae");

  let accessControlState = AccessControl.initState();

  func isAdmin(caller : Principal) : Bool {
    caller == HARDCODED_ADMIN or caller == HARDCODED_ADMIN_2 or AccessControl.isAdmin(accessControlState, caller);
  };

  public shared ({ caller }) func _initializeAccessControlWithSecret(userSecret : Text) : async () {
    switch (Prim.envVar<system>("CAFFEINE_ADMIN_TOKEN")) {
      case (null) { Runtime.trap("CAFFEINE_ADMIN_TOKEN environment variable is not set") };
      case (?adminToken) {
        AccessControl.initialize(accessControlState, caller, adminToken, userSecret);
      };
    };
  };

  public query ({ caller }) func getCallerUserRole() : async AccessControl.UserRole {
    AccessControl.getUserRole(accessControlState, caller);
  };

  public shared ({ caller }) func assignCallerUserRole(user : Principal, role : AccessControl.UserRole) : async () {
    AccessControl.assignRole(accessControlState, caller, user, role);
  };

  public query ({ caller }) func isCallerAdmin() : async Bool {
    isAdmin(caller);
  };

  public type UserProfile = {
    name : Text;
  };

  public type ContactSubmission = {
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();
  let submissions = List.empty<ContactSubmission>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not isAdmin(caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public shared func submitContactForm(name : Text, email : Text, phone : Text, message : Text) : async () {
    let newSubmission : ContactSubmission = { name; email; phone; message };
    submissions.add(newSubmission);
  };

  public query ({ caller }) func getAllSubmissions() : async [ContactSubmission] {
    if (not isAdmin(caller)) {
      Runtime.trap("Unauthorized");
    };
    submissions.toArray();
  };
};

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/hooks/useAuth";
import { useGetAllSubmissions, useIsCallerAdmin } from "@/hooks/useQueries";
import {
  AlertTriangle,
  InboxIcon,
  Loader2,
  LogOut,
  Mail,
  Phone,
  Shield,
  User,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

function truncatePrincipal(principal: string) {
  if (principal.length <= 20) return principal;
  return `${principal.slice(0, 10)}...${principal.slice(-6)}`;
}

export default function AdminDashboard() {
  const { isLoggedIn, isLoggingIn, login, logout, identity, isInitializing } =
    useAuth();

  const principal = identity?.getPrincipal().toString() ?? "";

  const { data: isAdmin, isLoading: isAdminLoading } = useIsCallerAdmin();

  const {
    data: submissions,
    isLoading: submissionsLoading,
    isError,
  } = useGetAllSubmissions();

  // ── Loading state ──
  if (isInitializing) {
    return (
      <div
        className="min-h-screen bg-background flex items-center justify-center"
        data-ocid="admin.loading_state"
      >
        <Loader2 className="h-8 w-8 animate-spin text-gold" />
      </div>
    );
  }

  // ── Login page ──
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="bg-card border border-gold/25 shadow-2xl">
            <CardHeader className="text-center pb-4 pt-8">
              <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center">
                <Shield className="text-gold" size={26} />
              </div>
              <CardTitle className="font-display text-2xl text-white">
                Admin Login
              </CardTitle>
              <p className="text-muted-foreground text-sm mt-2">
                Sign in with Internet Identity to view contact form submissions
              </p>
            </CardHeader>
            <CardContent className="pb-8 px-8">
              <Button
                onClick={login}
                disabled={isLoggingIn}
                className="w-full bg-gold text-navy-dark hover:bg-gold/90 font-sans font-bold uppercase tracking-widest text-sm h-12 rounded-sm"
                data-ocid="admin.primary_button"
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
              <p className="mt-4 text-center text-xs text-muted-foreground">
                <a
                  href="/"
                  className="hover:text-gold transition-colors"
                  data-ocid="admin.link"
                >
                  ← Back to website
                </a>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  // ── Checking admin role ──
  if (isAdminLoading) {
    return (
      <div
        className="min-h-screen bg-background flex items-center justify-center"
        data-ocid="admin.loading_state"
      >
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-gold" />
          <p className="text-muted-foreground text-sm">Verifying access...</p>
        </div>
      </div>
    );
  }

  // ── Access Denied ──
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card
            className="bg-card border border-destructive/40 shadow-2xl"
            data-ocid="admin.panel"
          >
            <CardHeader className="text-center pb-4 pt-8">
              <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="text-destructive" size={26} />
              </div>
              <CardTitle className="font-display text-2xl text-white">
                Access Denied
              </CardTitle>
              <p className="text-muted-foreground text-sm mt-2">
                Your account does not have admin privileges.
              </p>
            </CardHeader>
            <CardContent className="pb-8 px-8 space-y-4">
              <div className="rounded-lg bg-muted/30 px-4 py-3 border border-border">
                <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">
                  Your Principal ID
                </p>
                <p className="text-xs text-white font-mono break-all">
                  {principal}
                </p>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Share your Principal ID with the site admin to request access.
              </p>
              <Button
                onClick={logout}
                variant="outline"
                className="w-full border-border text-muted-foreground hover:text-white hover:border-gold/40 font-sans font-semibold uppercase tracking-widest text-xs h-11 rounded-sm"
                data-ocid="admin.secondary_button"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  // ── Admin Dashboard ──
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-navy-dark border-b border-gold/20 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gold/15 flex items-center justify-center">
                <Shield className="text-gold" size={16} />
              </div>
              <div>
                <h1 className="font-display text-lg font-bold text-white leading-none">
                  Admin Dashboard
                </h1>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">
                  Elite Short-Term Rental
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/20">
                <User size={12} className="text-gold" />
                <span className="text-xs text-muted-foreground font-mono">
                  {truncatePrincipal(principal)}
                </span>
              </div>
              <Button
                onClick={logout}
                variant="outline"
                size="sm"
                className="border-border text-muted-foreground hover:text-white hover:border-gold/40 text-xs uppercase tracking-wider rounded-sm"
                data-ocid="admin.secondary_button"
              >
                <LogOut className="mr-1.5 h-3.5 w-3.5" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Stats row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <Card className="bg-card border border-gold/20">
              <CardContent className="flex items-center gap-4 p-5">
                <div className="w-11 h-11 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                  <Users className="text-gold" size={20} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    Total Submissions
                  </p>
                  <p className="text-2xl font-bold text-white font-display">
                    {submissionsLoading ? (
                      <Skeleton className="h-7 w-10" />
                    ) : (
                      (submissions?.length ?? 0)
                    )}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border border-gold/20">
              <CardContent className="flex items-center gap-4 p-5">
                <div className="w-11 h-11 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                  <Mail className="text-gold" size={20} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    With Email
                  </p>
                  <p className="text-2xl font-bold text-white font-display">
                    {submissionsLoading ? (
                      <Skeleton className="h-7 w-10" />
                    ) : (
                      (submissions?.filter((s) => s.email).length ?? 0)
                    )}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border border-gold/20">
              <CardContent className="flex items-center gap-4 p-5">
                <div className="w-11 h-11 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                  <Phone className="text-gold" size={20} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    With Phone
                  </p>
                  <p className="text-2xl font-bold text-white font-display">
                    {submissionsLoading ? (
                      <Skeleton className="h-7 w-10" />
                    ) : (
                      (submissions?.filter((s) => s.phone).length ?? 0)
                    )}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Submissions section */}
          <Card className="bg-card border border-gold/20">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="font-display text-xl text-white">
                  Contact Form Submissions
                </CardTitle>
                {!submissionsLoading && !isError && (
                  <Badge
                    variant="outline"
                    className="border-gold/30 text-gold text-xs"
                  >
                    {submissions?.length ?? 0} total
                  </Badge>
                )}
              </div>
            </CardHeader>
            <Separator className="bg-gold/15" />
            <CardContent className="p-0">
              {/* Loading */}
              {submissionsLoading && (
                <div className="p-6 space-y-3" data-ocid="admin.loading_state">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-16 w-full rounded-md" />
                  ))}
                </div>
              )}

              {/* Error */}
              {isError && (
                <div className="p-10 text-center" data-ocid="admin.error_state">
                  <AlertTriangle
                    className="text-destructive mx-auto mb-3"
                    size={32}
                  />
                  <p className="text-white font-medium">
                    Failed to load submissions
                  </p>
                  <p className="text-muted-foreground text-sm mt-1">
                    Please refresh the page and try again.
                  </p>
                </div>
              )}

              {/* Empty state */}
              {!submissionsLoading && !isError && submissions?.length === 0 && (
                <div className="p-14 text-center" data-ocid="admin.empty_state">
                  <InboxIcon
                    className="text-muted-foreground mx-auto mb-3"
                    size={40}
                  />
                  <p className="text-white font-medium">No submissions yet</p>
                  <p className="text-muted-foreground text-sm mt-1">
                    Contact form submissions will appear here.
                  </p>
                </div>
              )}

              {/* Table — desktop */}
              {!submissionsLoading &&
                !isError &&
                (submissions?.length ?? 0) > 0 && (
                  <>
                    {/* Desktop table */}
                    <div
                      className="hidden md:block overflow-x-auto"
                      data-ocid="admin.table"
                    >
                      <Table>
                        <TableHeader>
                          <TableRow className="border-gold/15 hover:bg-transparent">
                            <TableHead className="text-muted-foreground text-xs uppercase tracking-wider w-10">
                              #
                            </TableHead>
                            <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">
                              Name
                            </TableHead>
                            <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">
                              Email
                            </TableHead>
                            <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">
                              Phone
                            </TableHead>
                            <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">
                              Message
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {submissions?.map((sub, idx) => (
                            <TableRow
                              key={`${sub.email}-${idx}`}
                              className="border-gold/10 hover:bg-gold/5 transition-colors"
                              data-ocid={`admin.row.${idx + 1}`}
                            >
                              <TableCell className="text-muted-foreground text-sm">
                                {idx + 1}
                              </TableCell>
                              <TableCell className="text-white font-medium">
                                <div className="flex items-center gap-2">
                                  <div className="w-7 h-7 rounded-full bg-gold/15 flex items-center justify-center shrink-0">
                                    <span className="text-gold text-xs font-bold">
                                      {sub.name.charAt(0).toUpperCase()}
                                    </span>
                                  </div>
                                  {sub.name}
                                </div>
                              </TableCell>
                              <TableCell>
                                <a
                                  href={`mailto:${sub.email}`}
                                  className="text-gold hover:underline text-sm"
                                >
                                  {sub.email}
                                </a>
                              </TableCell>
                              <TableCell>
                                {sub.phone ? (
                                  <a
                                    href={`tel:${sub.phone}`}
                                    className="text-muted-foreground hover:text-gold transition-colors text-sm"
                                  >
                                    {sub.phone}
                                  </a>
                                ) : (
                                  <span className="text-muted-foreground/40 text-sm">
                                    —
                                  </span>
                                )}
                              </TableCell>
                              <TableCell className="max-w-xs">
                                <p className="text-muted-foreground text-sm truncate">
                                  {sub.message}
                                </p>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>

                    {/* Mobile cards */}
                    <div className="md:hidden divide-y divide-gold/10">
                      {submissions?.map((sub, idx) => (
                        <div
                          key={`${sub.email}-${idx}`}
                          className="p-5 space-y-3"
                          data-ocid={`admin.item.${idx + 1}`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-gold/15 flex items-center justify-center shrink-0">
                              <span className="text-gold font-bold">
                                {sub.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <p className="text-white font-medium">
                                {sub.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Submission #{idx + 1}
                              </p>
                            </div>
                          </div>
                          {sub.email && (
                            <div className="flex items-center gap-2">
                              <Mail
                                size={13}
                                className="text-muted-foreground shrink-0"
                              />
                              <a
                                href={`mailto:${sub.email}`}
                                className="text-gold hover:underline text-sm break-all"
                              >
                                {sub.email}
                              </a>
                            </div>
                          )}
                          {sub.phone && (
                            <div className="flex items-center gap-2">
                              <Phone
                                size={13}
                                className="text-muted-foreground shrink-0"
                              />
                              <a
                                href={`tel:${sub.phone}`}
                                className="text-muted-foreground text-sm"
                              >
                                {sub.phone}
                              </a>
                            </div>
                          )}
                          {sub.message && (
                            <p className="text-muted-foreground text-sm leading-relaxed border-l-2 border-gold/20 pl-3">
                              {sub.message}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <a
            href="/"
            className="text-sm text-muted-foreground hover:text-gold transition-colors"
            data-ocid="admin.link"
          >
            ← Back to website
          </a>
        </div>
      </main>
    </div>
  );
}

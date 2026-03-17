import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitContactForm } from "@/hooks/useQueries";
import {
  Building2,
  Camera,
  Check,
  FileText,
  Loader2,
  Mail,
  Menu,
  MessageCircle,
  Phone,
  Shield,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const services = [
  {
    icon: Building2,
    title: "Property Management",
    description:
      "Complete oversight of your rental property with professional management and maintenance coordination.",
    bullets: [
      "Regular property inspections",
      "Maintenance coordination",
      "Cleaning schedule management",
      "Inventory management",
    ],
  },
  {
    icon: Users,
    title: "Guest Experience",
    description:
      "Exceptional guest services that ensure 5-star reviews and repeat bookings.",
    bullets: [
      "24/7 guest support",
      "Personalized welcome packages",
      "Concierge services",
      "Guest feedback management",
    ],
  },
  {
    icon: Camera,
    title: "Listing & Brand Positioning",
    description:
      "Strategic marketing and brand positioning to maximize your property's visibility.",
    bullets: [
      "Professional photography",
      "Compelling listing descriptions",
      "Multi-platform marketing",
      "Brand identity development",
    ],
  },
  {
    icon: Shield,
    title: "Protection & Claims",
    description:
      "Comprehensive protection and efficient claims handling for your peace of mind.",
    bullets: [
      "Damage protection coverage",
      "Insurance claim assistance",
      "Security deposit management",
      "Legal compliance support",
    ],
  },
  {
    icon: TrendingUp,
    title: "Revenue Optimization",
    description:
      "Strategic pricing and marketing to maximize your rental income and occupancy rates.",
    bullets: [
      "Dynamic pricing strategies",
      "Market analysis",
      "Seasonal rate adjustments",
      "Competitor monitoring",
    ],
  },
  {
    icon: FileText,
    title: "Financial Reporting",
    description:
      "Detailed monthly reports and transparent accounting for complete financial visibility.",
    bullets: [
      "Monthly income statements",
      "Expense tracking",
      "Performance analytics",
      "Tax documentation",
    ],
  },
];

const navLinks = ["Home", "Services", "About", "Contact"];

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export default function PublicSite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const {
    mutate: submitForm,
    isPending,
    isSuccess,
    reset: resetMutation,
  } = useSubmitContactForm();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  function handleNav(link: string) {
    setMenuOpen(false);
    const id = link.toLowerCase();
    setTimeout(() => scrollToSection(id), 250);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    submitForm(form, {
      onSuccess: () => {
        toast.success("Message sent! We'll be in touch shortly.");
        setForm({ name: "", email: "", phone: "", message: "" });
        resetMutation();
      },
      onError: () => {
        toast.error("Failed to send message. Please try again.");
      },
    });
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster richColors />

      {/* ── NAVBAR ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-navy-dark/95 backdrop-blur-md shadow-lg"
            : "bg-navy-dark"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Brand */}
            <button
              type="button"
              onClick={() => scrollToSection("home")}
              className="flex flex-col leading-none text-left"
              data-ocid="nav.link"
            >
              <span className="font-display text-2xl font-bold text-gold tracking-tight">
                Elite
              </span>
              <span className="text-[9px] font-sans font-medium text-muted-foreground tracking-[0.2em] uppercase">
                Short-Term Rental Management
              </span>
            </button>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  type="button"
                  key={link}
                  onClick={() => handleNav(link)}
                  className="text-sm font-sans font-medium text-muted-foreground hover:text-gold transition-colors tracking-wide"
                  data-ocid="nav.link"
                >
                  {link}
                </button>
              ))}
            </nav>

            {/* CTA + mobile toggle */}
            <div className="flex items-center gap-3">
              <Button
                onClick={() => scrollToSection("contact")}
                className="hidden md:inline-flex bg-gold text-navy-dark hover:bg-gold/90 font-sans font-semibold text-xs uppercase tracking-widest px-5 rounded-full"
                data-ocid="nav.primary_button"
              >
                Get Started
              </Button>
              <button
                type="button"
                className="md:hidden text-foreground p-1"
                onClick={() => setMenuOpen((v) => !v)}
                aria-label="Toggle menu"
                data-ocid="nav.toggle"
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden bg-navy-dark border-t border-border"
            >
              <div className="px-6 py-4 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <button
                    type="button"
                    key={link}
                    onClick={() => handleNav(link)}
                    className="text-sm font-sans font-medium text-muted-foreground hover:text-gold transition-colors text-left tracking-wide py-1"
                    data-ocid="nav.link"
                  >
                    {link}
                  </button>
                ))}
                <Button
                  onClick={() => {
                    setMenuOpen(false);
                    setTimeout(() => scrollToSection("contact"), 250);
                  }}
                  className="bg-gold text-navy-dark hover:bg-gold/90 font-sans font-semibold text-xs uppercase tracking-widest rounded-full mt-2"
                  data-ocid="nav.primary_button"
                >
                  Get Started
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── HERO ── */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center text-center overflow-hidden"
        style={{
          backgroundImage: `url('/assets/generated/hero-luxury-rental.dim_1920x1080.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/80 via-navy-dark/70 to-navy-dark/90" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Gold badge */}
            <span className="inline-block mb-5 px-4 py-1.5 rounded-full border border-gold text-gold text-xs font-sans font-semibold uppercase tracking-[0.2em]">
              No Fee Before Work Done
            </span>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-6">
              Elite Short-Term
              <br />
              Rental Management
            </h1>

            <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
              Premium management services for property owners who expect
              excellence and exceptional returns.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => scrollToSection("services")}
                className="bg-gold text-navy-dark hover:bg-gold/90 font-sans font-semibold uppercase tracking-widest text-sm px-8 py-3 h-auto rounded-sm"
                data-ocid="hero.primary_button"
              >
                Our Services
              </Button>
              <Button
                onClick={() => scrollToSection("contact")}
                variant="outline"
                className="border-gold text-gold hover:bg-gold/10 font-sans font-semibold uppercase tracking-widest text-sm px-8 py-3 h-auto rounded-sm bg-transparent"
                data-ocid="hero.secondary_button"
              >
                Get Started
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section
        id="services"
        className="py-20 lg:py-28"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.12 0.03 240) 0%, oklch(0.15 0.04 240) 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
              Our Premium Services
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Comprehensive management solutions tailored to maximize your
              property's potential.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="rounded-lg border border-gold/25 bg-card p-6 hover:border-gold/60 hover:shadow-gold transition-all duration-300"
                  data-ocid={`services.item.${i + 1}`}
                >
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center mb-4">
                    <Icon className="text-gold" size={20} />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="mt-0.5 text-gold shrink-0">›</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE ── */}
      <section
        id="about"
        className="py-20 lg:py-28"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.15 0.04 240) 0%, oklch(0.17 0.04 240) 100%)",
        }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6">
              Why Choose Premier
              <br />
              Rental Management?
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              We are a premium short-term rental management firm built for
              serious property owners who expect more than average returns. Our
              team combines extensive experience with cutting-edge technology to
              deliver exceptional results.
            </p>
            <div className="flex flex-col gap-4 text-left max-w-xl mx-auto">
              {[
                "Personalized service for each property owner",
                "Advanced marketing and booking systems",
                "24/7 guest and owner support",
              ].map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-gold/15 flex items-center justify-center shrink-0">
                    <Check className="text-gold" size={12} />
                  </div>
                  <span className="text-white font-medium">{point}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section
        id="contact"
        className="py-20 lg:py-28"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.17 0.04 240) 0%, oklch(0.12 0.03 240) 100%)",
        }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
              Get Started Today
            </h2>
            <p className="text-muted-foreground text-lg">
              Transform your rental property into a premium investment.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
                data-ocid="contact.panel"
              >
                <div>
                  <Label
                    htmlFor="name"
                    className="text-sm font-medium text-muted-foreground mb-1.5 block"
                  >
                    Your Name
                  </Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, name: e.target.value }))
                    }
                    required
                    placeholder="John Smith"
                    className="bg-card border-border focus:border-gold text-white placeholder:text-muted-foreground/50"
                    data-ocid="contact.input"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-muted-foreground mb-1.5 block"
                  >
                    Your Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, email: e.target.value }))
                    }
                    required
                    placeholder="john@example.com"
                    className="bg-card border-border focus:border-gold text-white placeholder:text-muted-foreground/50"
                    data-ocid="contact.input"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="phone"
                    className="text-sm font-medium text-muted-foreground mb-1.5 block"
                  >
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, phone: e.target.value }))
                    }
                    placeholder="+91 90303 90067"
                    className="bg-card border-border focus:border-gold text-white placeholder:text-muted-foreground/50"
                    data-ocid="contact.input"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="message"
                    className="text-sm font-medium text-muted-foreground mb-1.5 block"
                  >
                    Tell us about your property
                  </Label>
                  <Textarea
                    id="message"
                    value={form.message}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, message: e.target.value }))
                    }
                    required
                    rows={4}
                    placeholder="Describe your property, location, and what you're looking for..."
                    className="bg-card border-border focus:border-gold text-white placeholder:text-muted-foreground/50 resize-none"
                    data-ocid="contact.textarea"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-gold text-navy-dark hover:bg-gold/90 font-sans font-bold uppercase tracking-widest text-sm h-12 rounded-sm"
                  data-ocid="contact.submit_button"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
                {isSuccess && (
                  <p
                    className="text-center text-sm text-gold"
                    data-ocid="contact.success_state"
                  >
                    ✓ Message sent successfully!
                  </p>
                )}
              </form>
            </motion.div>

            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col gap-6 lg:pt-4"
            >
              <div>
                <h3 className="font-display text-2xl font-semibold text-white mb-4">
                  Contact Information
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Ready to maximize your rental property's potential? Reach out
                  to us directly or fill in the form and we'll get back to you
                  promptly.
                </p>
              </div>

              <div className="space-y-4">
                <a
                  href="https://wa.me/9030390067"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-lg border border-border bg-card hover:border-gold/40 transition-colors group"
                  data-ocid="contact.link"
                >
                  <div className="w-10 h-10 rounded-full bg-green-900/30 flex items-center justify-center shrink-0">
                    <MessageCircle className="text-green-400" size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      WhatsApp
                    </p>
                    <p className="text-white font-medium">90303 90067</p>
                  </div>
                </a>

                <a
                  href="tel:+919030390067"
                  className="flex items-center gap-3 p-4 rounded-lg border border-border bg-card hover:border-gold/40 transition-colors"
                  data-ocid="contact.link"
                >
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                    <Phone className="text-gold" size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      Phone
                    </p>
                    <p className="text-white font-medium">+91 90303 90067</p>
                  </div>
                </a>

                <a
                  href="mailto:devisriprasad.b9030@gmail.com"
                  className="flex items-center gap-3 p-4 rounded-lg border border-border bg-card hover:border-gold/40 transition-colors"
                  data-ocid="contact.link"
                >
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                    <Mail className="text-gold" size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      Email
                    </p>
                    <p className="text-white font-medium">
                      devisriprasad.b9030@gmail.com
                    </p>
                  </div>
                </a>
              </div>

              <a
                href="https://wa.me/9030390067"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-green-700 hover:bg-green-600 text-white font-sans font-bold uppercase tracking-widest text-sm h-12 rounded-sm transition-colors"
                data-ocid="contact.primary_button"
              >
                <MessageCircle size={18} />
                Chat on WhatsApp
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-navy-dark border-t border-border py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            {/* Brand */}
            <div>
              <div className="font-display text-xl font-bold text-gold mb-1">
                Elite
              </div>
              <div className="text-[9px] font-sans font-medium text-muted-foreground tracking-[0.2em] uppercase mb-3">
                Short-Term Rental Management
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Your trusted partner in premium rental property management.
              </p>
            </div>

            {/* Services links */}
            <div>
              <h4 className="font-sans text-xs font-semibold uppercase tracking-widest text-gold mb-4">
                Services
              </h4>
              <ul className="space-y-2">
                {[
                  "Property Management",
                  "Tenant Screening",
                  "Revenue Optimization",
                  "Maintenance",
                ].map((s) => (
                  <li key={s}>
                    <button
                      type="button"
                      onClick={() => scrollToSection("services")}
                      className="text-sm text-muted-foreground hover:text-gold transition-colors"
                      data-ocid="footer.link"
                    >
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company links */}
            <div>
              <h4 className="font-sans text-xs font-semibold uppercase tracking-widest text-gold mb-4">
                Company
              </h4>
              <ul className="space-y-2">
                {[
                  "About Us",
                  "Contact",
                  "Privacy Policy",
                  "Terms of Service",
                ].map((s) => (
                  <li key={s}>
                    <button
                      type="button"
                      onClick={() =>
                        scrollToSection(
                          s.toLowerCase().replace(" ", "") === "aboutus"
                            ? "about"
                            : "contact",
                        )
                      }
                      className="text-sm text-muted-foreground hover:text-gold transition-colors"
                      data-ocid="footer.link"
                    >
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Premier Rental Management. All rights
              reserved.
            </p>
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-gold transition-colors"
            >
              Built with ❤️ using caffeine.ai
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

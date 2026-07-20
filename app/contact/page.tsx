import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";
import ContactInformation from "@/components/contact/ContactInformation";
import BusinessHours from "@/components/contact/BusinessHours";
import OfficeLocation from "@/components/contact/OfficeLocation";
import FAQ from "@/components/contact/FAQ";
import ContactCTA from "@/components/contact/ContactCTA";

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactForm />
      <ContactInformation />
      <BusinessHours />
      <OfficeLocation />
      <FAQ />
      <ContactCTA />
    </>
  );
}
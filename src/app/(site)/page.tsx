import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import AchievementsSection from "@/components/sections/AchievementsSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/Footer";

// Content edits call revalidatePath, but a build-time Firestore timeout would
// otherwise bake an empty page in until the next deploy. This lets it self-heal.
export const revalidate = 300;

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ProjectsSection />
      <ExperienceSection />
      <SkillsSection />
      <AboutSection />
      <AchievementsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}

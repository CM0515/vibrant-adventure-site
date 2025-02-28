import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";
import { BookButton } from "@/components/BookButton";
import MobileMenu from "@/components/MobileMenu";

const About = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-lg" : "bg-transparent backdrop-blur-md"}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <img src="https://lh3.googleusercontent.com/a/ACg8ocLolP-oDXrcJRUDaixu8hEJLoPstVHIA4lCPvE7x49PkcIfTC8=s288-c-no" alt="GoTours Logo" className="w-10 h-10 rounded-full" />
              <span className={`text-2xl font-bold transition-colors duration-300 ${isScrolled ? "text-secondary" : "text-white"}`}>GoTours</span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className={`transition-colors duration-300 ${isScrolled ? "text-secondary hover:text-primary" : "text-white hover:text-primary-light"}`}>
                {t('nav.home')}
              </Link>
              <Link to="/tours" className={`transition-colors duration-300 ${isScrolled ? "text-secondary hover:text-primary" : "text-white hover:text-primary-light"}`}>
                {t('nav.tours')}
              </Link>
              <Link to="/about" className={`transition-colors duration-300 ${isScrolled ? "text-secondary hover:text-primary" : "text-white hover:text-primary-light"}`}>
                {t('nav.about')}
              </Link>
              <Link to="/contact" className={`transition-colors duration-300 ${isScrolled ? "text-secondary hover:text-primary" : "text-white hover:text-primary-light"}`}>
                {t('nav.contact')}
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <LanguageSelector />
              <div className="hidden md:block">
                <BookButton />
              </div>
              <MobileMenu isScrolled={isScrolled} />
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-12 bg-gradient-to-br from-primary-light to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              {t('about.title')}
            </h1>
            <p className="text-xl text-secondary-light max-w-4xl mx-auto mb-8">
              {t('about.subtitle')}
            </p>
            <div className="space-y-6 text-left max-w-4xl mx-auto">
              <p className="text-secondary-light leading-relaxed">
                {t('about.description.1')}
              </p>
              <p className="text-secondary-light leading-relaxed">
                {t('about.description.2')}
              </p>
              <p className="text-secondary-light leading-relaxed">
                {t('about.description.3')}
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-2xl font-serif font-semibold mb-4 text-primary">
                {t('about.mission.title')}
              </h2>
              <p className="text-secondary-light leading-relaxed">
                {t('about.mission.text')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-2xl font-serif font-semibold mb-4 text-primary">
                {t('about.vision.title')}
              </h2>
              <p className="text-secondary-light leading-relaxed">
                {t('about.vision.text')}
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-12"
          >
            <h2 className="text-2xl font-serif font-semibold mb-6 text-primary text-center">
              {t('about.values.title')}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[...Array(10)].map((_, index) => (
                <div key={index} className="text-center bg-primary/5 rounded-lg p-4">
                  <p className="font-medium text-secondary">
                    {t(`about.values.${index + 1}`)}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;

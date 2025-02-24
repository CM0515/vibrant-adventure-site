import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import LanguageSelector from "../components/LanguageSelector";
import { useLanguage } from "../contexts/LanguageContext";

const About = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF3E8] via-white to-[#FFE4CC]">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src="https://lh3.googleusercontent.com/a/ACg8ocLolP-oDXrcJRUDaixu8hEJLoPstVHIA4lCPvE7x49PkcIfTC8=s288-c-no" 
                alt="GoTours Logo" 
                className="w-10 h-10 rounded-full"
              />
              <span className="text-2xl font-bold text-secondary">GoTours</span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-secondary hover:text-primary">{t('nav.home')}</Link>
              <Link to="/tours" className="text-secondary hover:text-primary">{t('nav.tours')}</Link>
              <Link to="/about" className="text-secondary hover:text-primary">{t('nav.about')}</Link>
              <Link to="/contact" className="text-secondary hover:text-primary">{t('nav.contact')}</Link>
            </div>
            <div className="flex items-center gap-4">
              <LanguageSelector />
              <Link to="/reserva" className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-md transition-colors">
                {t('nav.book')}
              </Link>
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
            <p className="text-xl text-secondary-light max-w-2xl mx-auto">
              {t('about.subtitle')}
            </p>
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
            <h2 className="text-2xl font-serif font-semibold mb-4 text-primary text-center">
              {t('about.values.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <h3 className="font-semibold mb-2">{t('about.values.authenticity')}</h3>
                <p className="text-secondary-light">
                  {t('about.values.authenticity.text')}
                </p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold mb-2">{t('about.values.sustainability')}</h3>
                <p className="text-secondary-light">
                  {t('about.values.sustainability.text')}
                </p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold mb-2">{t('about.values.community')}</h3>
                <p className="text-secondary-light">
                  {t('about.values.community.text')}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;

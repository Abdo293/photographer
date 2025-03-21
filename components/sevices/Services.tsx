import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";

export const Services = () => {
  const t = useTranslations("ido");

  const data = [
    {
      img: "/service-icon1-1.svg",
      title: t("outDoor"),
      description: t("outDoorDes"),
    },
    {
      img: "/service-icon7-1.svg",
      title: t("archive"),
      description: t("archiveDesc"),
    },
    {
      img: "/service-icon6-1.svg",
      title: t("video"),
      description: t("videoDesc"),
    },
    {
      img: "/service-icon8-1.svg",
      title: t("events"),
      description: t("eventsDesc"),
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const fadeInUpVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const serviceCardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section
      className="container mx-auto px-4 py-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-50px" }}
      variants={containerVariants}
    >
      <motion.p
        className="text-white text-center font-bold pb-12 text-4xl"
        variants={fadeInUpVariants}
      >
        {t("services")}
      </motion.p>

      <motion.div
        className="grid grid-cols-4 max-lg:grid-cols-2 max-md:grid-cols-1 gap-10"
        variants={containerVariants}
      >
        {data.map((service, index) => (
          <motion.div
            key={index}
            variants={serviceCardVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="p-6 rounded-lg shadow-lg"
          >
            <motion.div variants={fadeInUpVariants}>
              <Image
                src={service.img}
                width={65}
                height={65}
                alt={service.title}
              />
            </motion.div>

            <motion.p
              className="font-medium text-[19px] text-white pt-10"
              variants={fadeInUpVariants}
            >
              {service.title}
            </motion.p>

            <motion.p
              className="leading-[26px] pt-2 text-gray-300"
              variants={fadeInUpVariants}
            >
              {service.description}
            </motion.p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

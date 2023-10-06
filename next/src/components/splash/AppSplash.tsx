import { motion } from "framer-motion";
import { HomeBackground } from "@/comman/assets";
import Image from "next/image";

const imgVariants = {
  normal: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      type: "linear",
    },
  },
};
const gradientVariants = {
  normal: {
    opacity: 0,
    width: "0%",
  },
  animate: {
    opacity: 0.8,
    width: "70%",
    transition: {
      delay: 0.4,
      duration: 0.8,
      type: "linear",
    },
  },
};
const textVariants = {
  normal: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.6,
      duration: 1,
      type: "linear",
    },
  },
};

function AppSplash() {
  return (
    <div className="w-full h-full bg-black">
      <motion.div
        className="absolute z-20 flex items-end pl-[13%] pb-[13%] h-full bg-gradient-to-r from-blue from-0% via-blue/50 via-30% to-blue/0 to-100%"
        variants={gradientVariants}
        initial="normal"
        animate="animate"
      >
        <motion.div
          className="z-30 text-white font-black desktop:text-5xl text-4xl leading-tight tracking-wide"
          variants={textVariants}
          initial="normal"
          animate="animate"
        >
          <h4>
            High
            <br />
            Intensity
            <br />
            Interval
            <br />
            Planing
            <br />
          </h4>
        </motion.div>
      </motion.div>
      <motion.div variants={imgVariants} initial="normal" animate="animate">
        <Image
          className="absolute opacity-70"
          fill
          src={HomeBackground}
          alt="home 배경"
        />
      </motion.div>
    </div>
  );
}

export default AppSplash;

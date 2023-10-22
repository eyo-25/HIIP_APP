export const buttonVarients = {
  normal: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.7,
      type: "linear",
    },
  },
};

export const getCalendarVariants = (isWeekly: boolean) => {
  const calendarVariants = {
    normal: {
      height: "0%",
    },
    animate: {
      height: isWeekly ? "20%" : "52%",
      transition: {
        duration: 0.45,
        type: "linear",
      },
    },
  };

  return calendarVariants;
};

export const getPlanBoardVariants = (isWeekly: boolean) => {
  const planBoardVariants = {
    normal: {
      height: "80%",
    },
    animate: {
      height: isWeekly ? "80%" : "48%",
      transition: {
        duration: 0.45,
        type: "linear",
      },
    },
  };
  return planBoardVariants;
};

export const calendarPickerVariants = {
  normal: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 1,
      type: "linear",
    },
  },
};

export const calendarListVariants = {
  normal: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.4,
      duration: 0.5,
      type: "linear",
    },
  },
};

export const calendarCardVariants = {
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

export const planListBoardVariants = {
  normal: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 1,
      type: "linear",
    },
  },
};

export const planCardVariants = {
  click: {
    scale: 0.95,
    transition: {
      delay: 0.3,
      type: "linear",
    },
  },
};

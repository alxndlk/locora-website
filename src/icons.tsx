import {
  GoChevronDown,
  GoChevronLeft,
  GoChevronRight,
  GoChevronUp,
} from "react-icons/go";
import type { IconBaseProps } from "react-icons";

export const Icons = {
  chevrons: {
    right: (props: IconBaseProps) => <GoChevronRight {...props} />,
    up: (props: IconBaseProps) => <GoChevronUp {...props} />,
    down: (props: IconBaseProps) => <GoChevronDown {...props} />,
    left: (props: IconBaseProps) => <GoChevronLeft {...props} />,
  },
  arrows: {
    right: (props: IconBaseProps) => <GoChevronRight {...props} />,
    up: (props: IconBaseProps) => <GoChevronUp {...props} />,
    down: (props: IconBaseProps) => <GoChevronDown {...props} />,
    left: (props: IconBaseProps) => <GoChevronLeft {...props} />,
  },
};

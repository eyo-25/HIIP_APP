import Link from "next/link";
import { IoChevronForward } from "react-icons/io5";
import { MyListType } from "./My.data";
import Image from "next/image";

type Props = {
  data: MyListType;
};

function MyList({ data }: Props) {
  const { title, link, icon } = data;

  return (
    <li className="desktop:py-10pxr py-8pxr border-b-2 border-gray-400">
      <Link
        className="flex justify-between items-center"
        href={link}
        target="_blank"
      >
        <div className="flex">
          <div className="relative h-28pxr w-28pxr mobile:h-23pxr mobile:w-23pxr">
            <Image fill src={icon} alt={title} />
          </div>
          <p className="ml-9pxr font-semibold text-gray-850 mt-2pxr mobile:text-sm">
            {title}
          </p>
        </div>
        <IoChevronForward className="desttop:w-30pxr desttop:h-30pxr w-25pxr h-25pxr text-gray-600" />
      </Link>
    </li>
  );
}

export default MyList;

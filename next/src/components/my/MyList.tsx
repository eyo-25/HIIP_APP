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
    <li className="py-10pxr border-b-2 border-gray-400">
      <Link
        className="flex justify-between items-center"
        href={link}
        target="_blank"
      >
        <div className="flex">
          <div className="relative h-28pxr w-28pxr">
            <Image fill src={icon} alt={title} />
          </div>
          <p className="ml-9pxr font-semibold text-gray-850 mt-4pxr">{title}</p>
        </div>
        <IoChevronForward className="w-30pxr h-30pxr text-gray-600" />
      </Link>
    </li>
  );
}

export default MyList;

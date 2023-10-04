import { StaticImageData } from "next/image";
import {
  DocumentIcon,
  FigmaIcon,
  GithubIcon,
  GoogleSheetIcon,
  NotionIcon,
  UserIcon,
} from "@/comman/assets";

export type MyListType = {
  title: string;
  link: string;
  icon: StaticImageData;
};

export const myDocuments: MyListType[] = [
  {
    title: "프로젝트 깃허브",
    link: "https://github.com/eyo-25",
    icon: GithubIcon,
  },
  {
    title: "개발 문서",
    link: "https://holy-coal-8ee.notion.site/HIIP-APP-622bfa1ddc434893b271e3b3b1175bd9?pvs=4",
    icon: NotionIcon,
  },
  {
    title: "디자인 문서",
    link: "https://www.figma.com/file/8XABWRsHFFCfcFmSc7ObI6/hiipApp?type=design&node-id=0%3A1&mode=design&t=yZBHJuvLBsCcr1Hj-1",
    icon: FigmaIcon,
  },
  {
    title: "개발 구글 시트",
    link: "https://docs.google.com/spreadsheets/d/1fzgbb_BKRRN-nnzisYvWBSXkz8aVSVDx_hBOsKrR93Y/edit?usp=sharing",
    icon: GoogleSheetIcon,
  },
];

export const myInteractions: MyListType[] = [
  {
    title: "개발자 이력서",
    link: "https://holy-coal-8ee.notion.site/a436536d8ac34a6bba9502e643cdae29?pvs=4",
    icon: DocumentIcon,
  },
  {
    title: "개발자 자기 소개서",
    link: "https://holy-coal-8ee.notion.site/f2d41346d5e8469d95220161c9db7c4d?pvs=4",
    icon: UserIcon,
  },
];

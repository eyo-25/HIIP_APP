type Props = {
  icon: JSX.Element;
  text: string;
};

function IconTilte({ icon, text }: Props) {
  return (
    <div className="flex items-center mb-8pxr">
      {icon}
      <h5 className="ml-5pxr mt-2pxr text-gray-700">{text}</h5>
    </div>
  );
}

export default IconTilte;

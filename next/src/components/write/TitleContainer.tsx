type Props = {
  title: string;
  id: string;
  children: React.ReactNode;
};

function TitleContainer({ title, id, children }: Props) {
  return (
    <div className="flex text-base justify-between items-center py-7pxr w-full border-b-gray-400 border-b">
      <label className="text-gray-850 mt-2pxr" htmlFor={id}>
        {title}
      </label>
      {children}
    </div>
  );
}

export default TitleContainer;

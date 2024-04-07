import React from 'react';

interface IProps {}

const Avatar: React.FC<IProps> = () => {
  return (
    <div className="text-lg h-full font-semibold aspect-square flex flex-row justify-center items-center rounded-full bg-white">
      <span>A</span>
    </div>
  );
};

export default React.memo(Avatar);

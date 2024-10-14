import Image from 'next/image';
import React from 'react';

const EmptyData: React.FC = () => {
  return (
    <div className="flex items-center justify-center my-5">
      <div>
        <Image src={'/assets/images/no-data.png'} width={320} height={320} alt='empty' className="my-4" />
        <p className='text-center '>There is no data found</p>
      </div>
    </div>
  );
};

export default EmptyData;

export const DotsLoader = () => {
  let circleCommonClasses = 'h-2 w-2 bg-current   rounded-full';

  return (
      <div className='flex w-full justify-center'>
          <div className={`${circleCommonClasses} mr-1 animate-bounce`}></div>
          <div
              className={`${circleCommonClasses} mr-1 animate-bounce200`}
          ></div>
          <div className={`${circleCommonClasses} animate-bounce400`}></div>
      </div>
  );
};
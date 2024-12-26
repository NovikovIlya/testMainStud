import React, { useState, useEffect, forwardRef } from 'react';
import { KeyOutlined, BulbOutlined, ExpandOutlined, AimOutlined, LinkOutlined, FontSizeOutlined, SyncOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useAppDispatch, useAppSelector } from '../../store';
import { setActiveOptions, setActiveOptionsReset } from '../../store/reducers/authSlice';


interface AccessibilityHelperProps {
  lang?: string;
  isOpen: boolean;
  ref:any;
}

const AccessibilityHelper: React.FC<AccessibilityHelperProps> = forwardRef(({ lang = 'en',isOpen },ref:any) => {
  const [activeText,setActiveText] = useState<any>(null)
  // const [activeOptions, setActiveOptions] = useState<string[]>([]);
  const activeOptions = useAppSelector((state) => state.auth.activeOptions);
  const dispatch = useAppDispatch()
  const text = {
    en: {
      tabs: 'Highlight Selected Items',
      animations: 'Block animations',
      blackAndWhite: 'Black and white page',
      inverse: 'Color inversion',
      links: 'Underline links',
      size: 'Increase size',
      cursorBlack: 'Black cursor',
      cursorWhite: 'White cursor',
      title: 'Underline headings',
      textSize: {
        text: 'Text',
        sm: 'Small',
        md: 'Med.',
        mx: 'Max'
      },
      reset: 'Reset'
    },
    ru: {
      tabs: 'Выделить активный элемент',
      animations: 'Блокировать анимации',
      blackAndWhite: 'Черно-белая страница',
      inverse: 'Инверсия цветов',
      links: 'Подчеркивать ссылки',
      size: 'Увеличить размер',
      cursorBlack: 'Черный курсор',
      cursorWhite: 'Белый курсор',
      title: 'Подчеркивать заголовки',
      textSize: {
        text: 'Текст',
        sm: 'Мал.',
        md: 'Сред.',
        mx: 'Бол.'
      },
      reset: 'Сбросить'
    },
    ro: {
      tabs: 'Navigare pron tastatura',
      animations: 'Blocare animatii',
      blackAndWhite: 'Tonuri de gri',
      inverse: 'Culori inversate',
      links: 'Linkuri subliniate',
      size: 'Marime',
      cursorBlack: 'Cursor negru',
      cursorWhite: 'Cursor alb',
      title: 'Titlurile subliniate',
      textSize: {
        text: 'Text',
        sm: 'Mic',
        md: 'Medium',
        mx: 'Mare'
      },
      reset: 'Resetare'
    }
  }[lang];



  const toggleOption = (option: string) => {
    // setActiveOptions(prev => 
    //   prev.includes(option) 
    //     ? prev.filter(item => item !== option)
    //     : [...prev, option]
    // );
    // dispatch(setActiveOptions(prev => 
    //   prev.includes(option) 
    //     ? prev.filter(item => item !== option)
    //     : [...prev, option]))
    const newActiveOptions = activeOptions.includes(option)
      ? activeOptions.filter((item:any) => item !== option)
      : [...activeOptions, option];

    dispatch(setActiveOptions(newActiveOptions));
  };

  const resetOptions = () => {
    dispatch(setActiveOptionsReset());
    document.body.style.fontSize = '';
    // window.location.reload();
    // changeTextSize('')
    resetText()
  };

  const resetText = ()=>{
    document.documentElement.style.fontSize = '';
    setActiveText('')
  }

  const changeTextSize = (size: string) => {
    // document.body.style.fontSize = size;
    document.documentElement.style.fontSize = size;
    setActiveText(size)
    // toggleOption('helper-core-blockAnim')
  };

  useEffect(() => {
    document.body.classList.remove('helper-core-tabHighlight', 'helper-core-blockAnim', 'helper-core-grey', 'helper-core-invert', 'helper-core-underline', 'helper-core-zoom', 'helper-core-blmouse', 'helper-core-whmouse', 'helper-core-titlesubline');
    activeOptions.forEach((option:any) => {
      document.body.classList.add(option);
    });
  }, [activeOptions]);

  return (
    <div  className={` fixed ${activeText==='18px' ? 'top-[748px]': activeText==='20px'  ? 'top-[810px]'  : activeText==='15px'  ?  'top-[645px]' : 'top-[678px]' } right-20 z-5000 `}>
      {/* <button onClick={toggleHelper} className="bg-blue-500 text-white p-2 rounded-full">
        <KeyOutlined className="h-6 w-6" />
      </button> */}
      {isOpen && (
        <div ref={ref} className="absolute bottom-12 right-2 w-74 bg-white shadow-lg rounded-lg p-8 accesibility-helper">
          <div  className="grid gap-4">
            {[
              { icon: KeyOutlined, text: text?.tabs, option: 'helper-core-tabHighlight' },
            //   { icon: BulbOutlined, text: text?.animations, option: 'helper-core-blockAnim' },
              { icon: BulbOutlined, text: text?.blackAndWhite, option: 'helper-core-grey' },
              { icon: FontSizeOutlined, text: text?.inverse, option: 'helper-core-invert' },
              { icon: LinkOutlined, text: text?.links, option: 'helper-core-underline' },
              { icon: ExpandOutlined, text: text?.size, option: 'helper-core-zoom' },
              { icon: AimOutlined, text: text?.cursorBlack, option: 'helper-core-blmouse' },
              { icon: AimOutlined, text: text?.cursorWhite, option: 'helper-core-whmouse' },
            //   { icon: FontSizeOutlined, text: text?.title, option: 'helper-core-titlesubline' },
            ].map(({ icon: Icon, text: optionText, option }) => (
              <Button
                key={option}
                onClick={() => toggleOption(option)}
                className={`flex justify-start items-center  space-x-2 p-5 rounded-xl  ${activeOptions.includes(option) ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
              >
                {Icon && <Icon className="h-4 w-4" />}
                <span>{optionText}</span>
              </Button>
            ))}
            <div className="flex items-center space-x-2">
              <span>{text?.textSize.text}:</span>
              <Button onClick={() => changeTextSize('15px')} className={`${activeText==='15px' ? 'border border-black border-solid' : ''}px-2 py-1 bg-gray-200 rounded`}>{text?.textSize.sm}</Button>
              <Button onClick={() => changeTextSize('18px')} className={`${activeText==='18px' ? 'border border-black border-solid' : ''} px-2 py-1 bg-gray-200 rounded`}>{text?.textSize.md}</Button>
              <Button onClick={() => changeTextSize('20px')} className={`${activeText==='20px' ? 'border border-black border-solid' : ''} px-2 py-1 bg-gray-200 rounded`}>{text?.textSize.mx}</Button>
              <Button onClick={() => changeTextSize('')} className="p-1 bg-gray-200 rounded">
                <SyncOutlined className="h-4 w-4" />
              </Button>
            </div>
            <Button onClick={resetOptions} className="w-full bg-red-500 text-white p-2 rounded-xl">
              {text?.reset}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
});

export default AccessibilityHelper;


import React, { useState, useEffect, forwardRef } from 'react';
import { KeyOutlined, BulbOutlined, ExpandOutlined, AimOutlined, LinkOutlined, FontSizeOutlined, SyncOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { useAppDispatch, useAppSelector } from '../../store';
import { setActiveOptions, setActiveOptionsReset } from '../../store/reducers/authSlice';

interface AccessibilityHelperProps {
  lang?: string;
  isOpen: boolean;
  onClose?: () => void;
  ref?: any;
}

const AccessibilityHelper: React.FC<AccessibilityHelperProps> = forwardRef(({ lang = 'en', isOpen, onClose }, ref: any) => {
  const [activeText, setActiveText] = useState<any>(null);
  const [isMobile, setIsMobile] = useState(false);
  const activeOptions = useAppSelector((state) => state.auth.activeOptions);
  const dispatch = useAppDispatch();

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
      reset: 'Reset',
      accessibility: 'Accessibility Settings'
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
      reset: 'Сбросить',
      accessibility: ''
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
      reset: 'Resetare',
      accessibility: 'Setări de accesibilitate'
    }
  }[lang];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleOption = (option: string) => {
    const newActiveOptions = activeOptions.includes(option)
      ? activeOptions.filter((item: any) => item !== option)
      : [...activeOptions, option];

    dispatch(setActiveOptions(newActiveOptions));
  };

  const resetOptions = () => {
    dispatch(setActiveOptionsReset());
    document.body.style.fontSize = '';
    resetText();
  };

  const resetText = () => {
    document.documentElement.style.fontSize = '';
    setActiveText('');
  };

  const changeTextSize = (size: string) => {
    document.documentElement.style.fontSize = size;
    setActiveText(size);
  };

  useEffect(() => {
    document.body.classList.remove('helper-core-tabHighlight', 'helper-core-blockAnim', 'helper-core-grey', 'helper-core-invert', 'helper-core-underline', 'helper-core-zoom', 'helper-core-blmouse', 'helper-core-whmouse', 'helper-core-titlesubline');
    activeOptions.forEach((option: any) => {
      document.body.classList.add(option);
    });
  }, [activeOptions]);

  const options = [
    { icon: KeyOutlined, text: text?.tabs, option: 'helper-core-tabHighlight' },
    { icon: BulbOutlined, text: text?.blackAndWhite, option: 'helper-core-grey' },
    { icon: FontSizeOutlined, text: text?.inverse, option: 'helper-core-invert' },
    { icon: LinkOutlined, text: text?.links, option: 'helper-core-underline' },
    { icon: ExpandOutlined, text: text?.size, option: 'helper-core-zoom' },
    { icon: AimOutlined, text: text?.cursorBlack, option: 'helper-core-blmouse' },
    { icon: AimOutlined, text: text?.cursorWhite, option: 'helper-core-whmouse' },
  ];

  const content = (
    <div className={` grid gap-${isMobile ? '3  ' : '4'}`}>
      {options
       .filter(({ option }) => {
        // Скрываем курсоры только на мобильных
        if (isMobile && (option === 'helper-core-blmouse' || option === 'helper-core-whmouse')) {
          return false;
        }
        return true;
      })
      .map(({ icon: Icon, text: optionText, option }) => (
        <Button
          key={option}
          onClick={() => toggleOption(option)}
          className={`flex justify-start items-center space-x-2 ${isMobile ? 'p-4 text-[13px] whitespace-normal text-left ' : 'p-5'} rounded-xl ${
            activeOptions.includes(option) ? 'bg-blue-500 text-white' : 'bg-gray-100'
          }`}
        >
          {Icon && <Icon className="h-4 w-4" />}
          <span>{optionText}</span>
        </Button>
      ))}
      <div className="flex items-center space-x-2 justify-between">
        <span>{text?.textSize.text}:</span>
        <Button 
          onClick={() => changeTextSize('15px')} 
          className={`${activeText === '15px' ? 'border border-black border-solid' : ''}px-2 py-1 bg-gray-200 rounded`}
        >
          {text?.textSize.sm}
        </Button>
        <Button 
          onClick={() => changeTextSize('18px')} 
          className={`${activeText === '18px' ? 'border border-black border-solid' : ''} px-2 py-1 bg-gray-200 rounded`}
        >
          {text?.textSize.md}
        </Button>
        <Button 
          onClick={() => changeTextSize('20px')} 
          className={`${activeText === '20px' ? 'border border-black border-solid' : ''} px-2 py-1 bg-gray-200 rounded`}
        >
          {text?.textSize.mx}
        </Button>
        <Button onClick={() => changeTextSize('')} className="p-1 bg-gray-200 rounded">
          <SyncOutlined className="h-4 w-4" />
        </Button>
      </div>
      <Button 
        onClick={resetOptions} 
        type='primary' 
        className="w-full text-white p-2 rounded-xl"
      >
        {text?.reset}
      </Button>
    </div>
  );

  // Мобильная версия - модальное окно
  if (isMobile) {
    return (
      <Modal
        title={''}
        open={isOpen}
        onCancel={onClose}
        footer={null}
        width="95%"
        centered
        wrapClassName='!h-[100%] !top-[100px] flex '
        className="accessibility-modal-mobile "
        bodyStyle={{ padding: '16px' }}
      >
        {content}
      </Modal>
    );
  }

  // Десктопная версия - оригинальное позиционирование
  return (
    <div className="absolute top-full left-[340px] mt-[600px] z-[5000]">
      {isOpen && (
        <div ref={ref} className="absolute bottom-12 right-[28px] w-74 bg-white shadow-lg rounded-lg p-8 accesibility-helper min-w-[312px]">
          {content}
        </div>
      )}
    </div>
  );
});

AccessibilityHelper.displayName = 'AccessibilityHelper';

export default AccessibilityHelper;
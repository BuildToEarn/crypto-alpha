import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Divider, Switch, Spin } from 'antd';

function onToggleDarkMode(checked, setDarkMode) {
  const root = document.getElementById('root');
  root.style.setProperty('--color-background', checked ? '#0E141C' : '#efefef');
  root.style.setProperty('--color-background-muted', checked ? '#152028' : '#ffffff');
  root.style.setProperty('--color-text-main', checked ? '#efefef' : '#121212');
  root.style.setProperty('--color-text-secondary', checked ? '#9a9a9a' : '#00000088');
  root.style.setProperty('--color-text-title', checked ? '#cdcdcd' : '#676767');

  if (setDarkMode) {
    console.log('writing to localstorage: ', checked);
    setDarkMode(checked);
    window.localStorage.setItem('dark-mode', checked ? 'true' : 'false');
  }
}

function getInitialColorMode() {

  // do nothing on server side
  if (typeof window !== "undefined") {

    // first check local storage
    const darkModePreferred = window.localStorage.getItem('dark-mode');
    if (darkModePreferred) {
      return darkModePreferred == 'true';
    }

    // if no local storage, check OS level preference
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const hasMediaQueryPreference = typeof mql.matches === 'boolean';
    if (hasMediaQueryPreference) {
      return mql.matches ? true : false;
    }
  }

  return false;
}

function routeToUrl(e, router) {
  console.log('page', e.target.innerHTML, e.target, e.currentTarget);
  switch(e.target.innerHTML) {
    case 'News': 
      router.push(`/news`);
      break;
    case 'Buy': 
      router.push(`/show`);
      break;
    case 'Sell': 
      router.push(`/ask`);
      break;
    case 'Coin': 
      router.push(`/jobs`);
      break;
    case 'Crypto Alpha':
      router.push('/news')
      break;
    default:
      router.push(`/news`);
      break;
  }
  //
}

export default function Header({path}) {

  console.log('path in header: ', path);
  const [darkModeEnabled, setDarkMode] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      const isDarkMode = getInitialColorMode();
      if (isDarkMode) {
        setDarkMode(true);
        console.log('dark mode enabled: ', darkModeEnabled);
        onToggleDarkMode(true, setDarkMode);
      }
    }, 0);
  }, [])

  return (
    <div style={{backgroundColor: '#FB651E', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
      <div style={{backgroundColor: '#FB651E', border: 'none', color: 'white', display: 'flex', alignItems: 'center', height: '100%', margin: '0 10% 0 10%', padding: '4px'}}>
        {/* <img src="/logo.png" alt="Ycombinator Logo" className={styles.logo} style={{cursor: 'pointer', border: '2px solid white'}} onClick={(item) => routeToUrl(item, router)}/> */}
        <span style={{cursor: 'pointer', marginRight: '16px', fontSize: '1.2rem'}} onClick={(item) => routeToUrl(item, router)}>Crypto Alpha</span>
        <Divider type="vertical"/>
        <span key="news" className={path === 'news' ? styles.bold : ''} style={{cursor: 'pointer'}} onClick={(item) => routeToUrl(item, router)}>News</span>
        <Divider type="vertical"/>
        <span key="show" className={path === 'show' ? styles.bold : ''} style={{cursor: 'pointer'}} onClick={(item) => routeToUrl(item, router)}>Buy</span>
        <Divider type="vertical"/>
        <span key="ask" className={path === 'ask' ? styles.bold : ''} style={{cursor: 'pointer'}} onClick={(item) => routeToUrl(item, router)}>Sell</span>
        <Divider type="vertical"/>
        <span key="jobs" className={path === 'jobs' ? styles.bold : ''} style={{cursor: 'pointer'}} onClick={(item) => routeToUrl(item, router)}>Coin</span>
      </div>
      <div style={{display: 'flex', color: 'white', alignItems: 'center', margin: '0 10% 0 0'}}>
        <span style={{marginRight: '8px'}}>Dark Mode ????</span>
        <Switch checked={darkModeEnabled} onChange={(checked) => onToggleDarkMode(checked, setDarkMode)} />
      </div>
    </div>
  )
}

// checkedChildren={<ThunderboltOutlined />} unCheckedChildren={<ThunderboltFilled />}
// eslint-disable-next-line import/default
import type React from 'react';

// Import images as URLs
import placeholderPng from '../../assets/placeholder.png';
import heroJpg from '../../assets/hero.jpg';
import iconWebp from '../../assets/icon.webp';
import largeBanner from '../../assets/large-banner.png'; // Large asset (>8KB) - will be emitted as file

// Import SVGs as React components and URLs
import { ReactComponent as LogoIcon } from '../../assets/logo.svg';
import { ReactComponent as HomeIcon } from '../../assets/icon-home.svg';
import { ReactComponent as StarIcon } from '../../assets/icon-star.svg';
import { ReactComponent as LargeGraphic } from '../../assets/large-graphic.svg'; // Large SVG (>8KB)
import logoSvgUrl from '../../assets/logo.svg';

// Import SVG as URL only (using regular import for now)
// import logoUrlOnly from '../../assets/logo.svg?url';

// Import media files
import demoVideo from '../../assets/demo.mp4';
import soundMp3 from '../../assets/sound.mp3';

// Import font and document
import customFont from '../../assets/custom-font.woff2';
import manualPdf from '../../assets/manual.pdf';

export interface AssetShowcaseProps {
  className?: string;
}

export const AssetShowcase: React.FC<AssetShowcaseProps> = ({ className }) => {
  return (
    <div className={className} data-testid='asset-showcase'>
      <h2>Asset Showcase</h2>

      {/* Image Assets */}
      <section>
        <h3>Images</h3>
        <div
          style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}
        >
          <div>
            <img src={placeholderPng} alt='Placeholder PNG' width='20' height='20' />
            <br />
            <small>Small PNG (inlined)</small>
          </div>
          <div>
            <img src={heroJpg} alt='Hero JPG' width='20' height='20' />
            <br />
            <small>Small JPG (inlined)</small>
          </div>
          <div>
            <img src={iconWebp} alt='Icon WebP' width='20' height='20' />
            <br />
            <small>Small WebP (inlined)</small>
          </div>
          <div>
            <img src={largeBanner} alt='Large Banner' width='40' height='40' />
            <br />
            <small>Large PNG (emitted as file)</small>
          </div>
        </div>
      </section>

      {/* SVG Assets */}
      <section>
        <h3>SVG Icons</h3>
        <div
          style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}
        >
          <div style={{ textAlign: 'center' }}>
            <LogoIcon width='24' height='24' title='Logo Icon' />
            <br />
            <small>Small SVG</small>
          </div>
          <div style={{ textAlign: 'center' }}>
            <HomeIcon width='24' height='24' title='Home Icon' />
            <br />
            <small>Small SVG</small>
          </div>
          <div style={{ textAlign: 'center' }}>
            <StarIcon width='24' height='24' title='Star Icon' />
            <br />
            <small>Small SVG</small>
          </div>
          <div style={{ textAlign: 'center' }}>
            <LargeGraphic width='60' height='60' title='Large Graphic' />
            <br />
            <small>Large SVG (emitted as file)</small>
          </div>
        </div>

        <div style={{ marginTop: '10px' }}>
          <p>
            SVG as image URL: <img src={logoSvgUrl} alt='Logo' width='20' height='20' />
          </p>
          {/* <p>SVG URL only: <img src={logoUrlOnly} alt="Logo URL only" width="20" height="20" /></p> */}
        </div>
      </section>

      {/* Media Assets */}
      <section>
        <h3>Media</h3>
        <div>
          <video width='200' height='100' controls>
            <track kind='captions' src={demoVideo} />
            <source src={demoVideo} type='video/mp4' />
            Your browser does not support the video tag.
          </video>
        </div>
        <div style={{ marginTop: '10px' }}>
          <audio controls>
            <track kind='captions' src={soundMp3} />
            <source src={soundMp3} type='audio/mpeg' />
            Your browser does not support the audio element.
          </audio>
        </div>
      </section>

      {/* Font and Document Assets */}
      <section>
        <h3>Other Assets</h3>
        <div>
          <p>
            Custom font URL: <code>{customFont}</code>
          </p>
          <p>
            Manual PDF:
            <a href={manualPdf} download='manual.pdf' style={{ marginLeft: '5px' }}>
              Download Manual
            </a>
          </p>
        </div>
      </section>

      {/* Asset URLs for testing */}
      <section style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
        <h4>Asset URLs (for testing)</h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div>
            <h5>Small Assets (Inlined as base64)</h5>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li>
                <strong>PNG:</strong> {placeholderPng.substring(0, 50)}...
              </li>
              <li>
                <strong>JPG:</strong> {heroJpg.substring(0, 50)}...
              </li>
              <li>
                <strong>WebP:</strong> {iconWebp.substring(0, 50)}...
              </li>
              <li>
                <strong>SVG URL:</strong> {logoSvgUrl.substring(0, 50)}...
              </li>
            </ul>
          </div>
          <div>
            <h5>Large Assets (Emitted as files)</h5>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li>
                <strong>Large PNG:</strong> {largeBanner}
              </li>
              <li>
                <strong>Video:</strong> {demoVideo}
              </li>
              <li>
                <strong>Audio:</strong> {soundMp3}
              </li>
              <li>
                <strong>Font:</strong> {customFont}
              </li>
              <li>
                <strong>PDF:</strong> {manualPdf}
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

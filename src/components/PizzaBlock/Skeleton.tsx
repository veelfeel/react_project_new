import React from 'react';
import ContentLoader from 'react-content-loader';

export const Skeleton: React.FC = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={300}
    height={466}
    viewBox="0 0 300 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <circle cx="140" cy="128" r="126" />
    <rect x="40" y="268" rx="5" ry="5" width="200" height="22" />
    <rect x="0" y="314" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="427" rx="10" ry="10" width="100" height="30" />
    <rect x="128" y="420" rx="25" ry="25" width="155" height="48" />
  </ContentLoader>
);

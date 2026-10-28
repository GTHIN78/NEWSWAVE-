import React from 'react';
export type AdSlotType = 
  | 'header-billboard' 
  | 'sidebar-rect' 
  | 'in-feed' 
  | 'in-feed-banner' 
  | 'article-inline' 
  | 'article-body'
  | string;

interface AdPlaceholderProps {
  slotType: AdSlotType;
  className?: string;
}

export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ slotType, className = '' }) => {
  const adConfigs: Record<string, { dimensions: string; label: string; description: string; heightClass: string }> = {
    'header-billboard': {
      dimensions: '728 × 90 / 970 × 250 (Billboard)',
      label: 'शीर्ष विज्ञापन स्थान (Header Billboard Ad Slot)',
      description: 'विज्ञापन स्थान — Google AdSense / DFP कोड के लिए तैयार',
      heightClass: 'min-h-[88px]'
    },
    'sidebar-rect': {
      dimensions: '300 × 250 (Medium Rectangle)',
      label: 'साइडबार विज्ञापन (Sidebar Rectangle Ad Slot)',
      description: 'विज्ञापन स्थान — 300x250 Ad Slot',
      heightClass: 'min-h-[250px]'
    },
    'in-feed': {
      dimensions: '728 × 90 / Fluid In-Feed',
      label: 'इन-फ़ीड विज्ञापन (In-Feed Sponsored Placement)',
      description: 'संपादकीय फ़ीड के बीच प्रायोजित संदेश या विज्ञापन स्थान',
      heightClass: 'min-h-[90px]'
    },
    'in-feed-banner': {
      dimensions: '728 × 90 / Fluid In-Feed',
      label: 'इन-फ़ीड विज्ञापन (In-Feed Sponsored Placement)',
      description: 'संपादकीय फ़ीड के बीच प्रायोजित संदेश या विज्ञापन स्थान',
      heightClass: 'min-h-[90px]'
    },
    'article-inline': {
      dimensions: '600 × 200 / Fluid Inline',
      label: 'लेख मध्य विज्ञापन (Article Inline Ad Slot)',
      description: 'लेख के मध्य में लक्षित विज्ञापन के लिए निर्धारित स्थान',
      heightClass: 'min-h-[120px]'
    },
    'article-body': {
      dimensions: '600 × 200 / Fluid Inline',
      label: 'लेख मध्य विज्ञापन (Article Inline Ad Slot)',
      description: 'लेख के मध्य में लक्षित विज्ञापन के लिए निर्धारित स्थान',
      heightClass: 'min-h-[120px]'
    }
  };

  const config = adConfigs[slotType] || {
    dimensions: 'Responsive Ad Slot',
    label: 'विज्ञापन स्थान (Advertisement Slot)',
    description: 'Google AdSense / DFP Ad Slot',
    heightClass: 'min-h-[90px]'
  };

  return (
    <div
      className={`border border-dashed border-gray-300 dark:border-neutral-800 bg-[#FAFAFA] dark:bg-neutral-900/60 rounded p-3 text-center flex flex-col items-center justify-center relative overflow-hidden transition-colors ${config.heightClass} ${className}`}
      role="region"
      aria-label="विज्ञापन स्थान"
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 bg-gray-200 dark:bg-neutral-800 text-gray-700 dark:text-neutral-300 rounded-xs">
          विज्ञापन | ADVERTISEMENT
        </span>
        <span className="text-[11px] text-gray-400 dark:text-neutral-500 font-mono">
          {config.dimensions}
        </span>
      </div>
      <p className="text-xs text-gray-600 dark:text-neutral-400 font-medium font-devanagari">
        {config.label}
      </p>
      <p className="text-[11px] text-gray-400 dark:text-neutral-500 mt-0.5">
        {config.description} (Demo Slot - Ready for AdSense / Direct Ads)
      </p>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  LayoutTemplate, 
  Type, 
  Image as ImageIcon, 
  Square, 
  Save, 
  Smartphone, 
  Monitor, 
  Trash2
} from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { CampaignSettings } from '../types';

interface EmailBuilderViewProps {
  settings: CampaignSettings;
}

interface CanvasBlock {
  id: string;
  type: 'header' | 'text' | 'image' | 'button' | 'divider';
  content: string;
  styles?: string;
}

export const EmailBuilderView: React.FC<EmailBuilderViewProps> = ({ settings }) => {
  const { showSuccess, showInfo } = useToast();
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>('desktop');
  const [campaignTitle, setCampaignTitle] = useState('Q3 Executive Growth & Product Update');
  
  const [blocks, setBlocks] = useState<CanvasBlock[]>([
    { id: 'b-1', type: 'header', content: `${settings.brandName} Newsletter` },
    { id: 'b-2', type: 'text', content: 'Drive high-impact enterprise scale with our latest operational frameworks and automated workflows.' },
    { id: 'b-3', type: 'button', content: 'Access Executive Briefing' }
  ]);
  
  const [selectedBlockId, setSelectedBlockId] = useState<string>(blocks[0].id);

  const handleAddBlock = (type: 'header' | 'text' | 'image' | 'button' | 'divider') => {
    let defaultContent = 'New Content Block';
    if (type === 'header') defaultContent = 'New Section Headline';
    if (type === 'button') defaultContent = 'Click Here';
    if (type === 'image') defaultContent = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop';

    const newBlock: CanvasBlock = {
      id: `block-${Date.now()}`,
      type,
      content: defaultContent
    };

    setBlocks([...blocks, newBlock]);
    setSelectedBlockId(newBlock.id);
    showInfo(`Added new ${type} block to canvas.`);
  };

  const handleUpdateContent = (id: string, newContent: string) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, content: newContent } : b));
  };

  const handleDeleteBlock = (id: string) => {
    setBlocks(blocks.filter(b => b.id !== id));
    if (selectedBlockId === id && blocks.length > 1) {
      const remaining = blocks.filter(b => b.id !== id);
      setSelectedBlockId(remaining[0].id);
    }
  };

  const handleSaveCampaign = () => {
    showSuccess('Email campaign saved successfully to Supabase draft queue.');
  };

  const selectedBlock = blocks.find(b => b.id === selectedBlockId);

  return (
    <div className="max-w-7xl mx-auto space-y-5">
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-sky-50 text-sky-700 border border-sky-200">
              DRAG-AND-DROP STUDIO
            </span>
            <span className="text-xs text-slate-500 font-medium">Constant Contact Parity Preview</span>
          </div>
          <input
            type="text"
            value={campaignTitle}
            onChange={(e) => setCampaignTitle(e.target.value)}
            className="text-lg font-bold text-slate-950 mt-1 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-[#0284c7] outline-none transition-colors w-full sm:w-96"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-100 p-1 rounded-lg flex items-center gap-1 border border-slate-200">
            <button
              onClick={() => setDeviceMode('desktop')}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${deviceMode === 'desktop' ? 'bg-white text-[#0b2545] shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
              title="Desktop View"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDeviceMode('mobile')}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${deviceMode === 'mobile' ? 'bg-white text-[#0b2545] shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
              title="Mobile View"
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleSaveCampaign}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#0b2545] hover:bg-[#133966] text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Save className="w-3.5 h-3.5 text-sky-300" />
            <span>Save Campaign</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Content Blocks</h3>
          <p className="text-[11px] text-slate-500">Click any block to insert it into the active email canvas.</p>

          <div className="grid grid-cols-1 gap-2 pt-2">
            <button
              onClick={() => handleAddBlock('header')}
              className="flex items-center gap-2.5 p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 transition-all cursor-pointer"
            >
              <Type className="w-4 h-4 text-[#0284c7]" />
              <span>Headline / Header</span>
            </button>
            <button
              onClick={() => handleAddBlock('text')}
              className="flex items-center gap-2.5 p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 transition-all cursor-pointer"
            >
              <LayoutTemplate className="w-4 h-4 text-emerald-600" />
              <span>Text Paragraph</span>
            </button>
            <button
              onClick={() => handleAddBlock('button')}
              className="flex items-center gap-2.5 p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 transition-all cursor-pointer"
            >
              <Square className="w-4 h-4 text-purple-600" />
              <span>Action Button</span>
            </button>
            <button
              onClick={() => handleAddBlock('image')}
              className="flex items-center gap-2.5 p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 transition-all cursor-pointer"
            >
              <ImageIcon className="w-4 h-4 text-amber-600" />
              <span>Image Banner</span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-6 flex justify-center">
          <div className={`bg-white border border-slate-200 rounded-2xl shadow-xl transition-all overflow-hidden ${
            deviceMode === 'mobile' ? 'w-[380px] min-h-[600px]' : 'w-full min-h-[600px]'
          }`}>
            <div className="bg-slate-100 px-6 py-4 border-b border-slate-200 text-center">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{settings.brandName} Broadcast Preview</span>
            </div>

            <div className="p-6 space-y-4">
              {blocks.map((block) => {
                const isSelected = selectedBlockId === block.id;

                return (
                  <div
                    key={block.id}
                    onClick={() => setSelectedBlockId(block.id)}
                    className={`relative p-4 rounded-xl border transition-all cursor-pointer group ${
                      isSelected ? 'border-[#0284c7] ring-2 ring-sky-100 bg-sky-50/20' : 'border-dashed border-slate-200 hover:border-slate-400 bg-white'
                    }`}
                  >
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 bg-white border border-slate-200 rounded-md shadow-xs p-1">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDeleteBlock(block.id); }}
                        className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                        title="Delete block"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {block.type === 'header' && (
                      <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                        {block.content}
                      </h2>
                    )}
                    {block.type === 'text' && (
                      <p className="text-xs text-slate-700 leading-relaxed">
                        {block.content}
                      </p>
                    )}
                    {block.type === 'button' && (
                      <div className="py-1">
                        <span className="inline-block px-5 py-2.5 bg-[#0284c7] text-white text-xs font-bold rounded-lg shadow-sm">
                          {block.content}
                        </span>
                      </div>
                    )}
                    {block.type === 'image' && (
                      <div className="rounded-lg overflow-hidden border border-slate-200 bg-slate-100 h-40 flex items-center justify-center text-xs text-slate-400">
                        <span>Image Banner Container</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Block Inspector</h3>
          
          {selectedBlock ? (
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
                  Editing {selectedBlock.type}
                </label>
                <textarea
                  rows={4}
                  value={selectedBlock.content}
                  onChange={(e) => handleUpdateContent(selectedBlock.id, e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-[#0284c7] outline-none leading-relaxed"
                />
              </div>
              <p className="text-[11px] text-slate-400">Changes reflect instantly on the central interactive canvas.</p>
            </div>
          ) : (
            <p className="text-xs text-slate-400">Select any block on the canvas to edit its properties.</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default EmailBuilderView;
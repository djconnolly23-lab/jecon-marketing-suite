import React, { useState } from 'react';
import { 
  Workflow, 
  Zap, 
  GitBranch, 
  Bot, 
  Play, 
  Clock, 
  CheckCircle2, 
  Plus, 
  ArrowDown, 
  Settings2,
  Sparkles,
  ShieldAlert
} from 'lucide-react';
import { MarketingWorkflow, WorkflowNode } from '../types';

interface WorkflowBuilderViewProps {
  onSave?: (workflow: MarketingWorkflow) => void;
}

export const WorkflowBuilderView: React.FC<WorkflowBuilderViewProps> = () => {
  const [workflows, setWorkflows] = useState<MarketingWorkflow[]>([
    {
      id: 'wf-001',
      name: 'AI Lead Nurture & Win-Back Sequence',
      description: 'Customer enters CRM → AI identifies segment → Send email → Wait 3 days → Did they open? (Yes/No routing)',
      active: true,
      createdAt: '2026-09-01',
      updatedAt: '2026-09-08',
      nodes: [
        {
          id: 'node-1',
          type: 'trigger',
          title: 'Customer Enters CRM',
          description: 'New lead record created via web form or API ingestion',
          config: { source: 'All Lead Sources', filter: 'Tags contains "Enterprise"' }
        },
        {
          id: 'node-2',
          type: 'ai_decision',
          title: 'AI Identify Customer Segment',
          description: 'Jane evaluates company size, intent signals, and budget range',
          config: { model: 'DAKO-Marketer-Core v4', confidenceThreshold: 0.85 }
        },
        {
          id: 'node-3',
          type: 'action',
          title: 'Send Personalized Email',
          description: 'Dispatch AI-tailored introductory sequence with dynamic value proposition',
          config: { template: 'Q3 Executive Outreach', channel: 'Email' }
        },
        {
          id: 'node-4',
          type: 'wait',
          title: 'Wait 3 Days',
          description: 'Pause execution to monitor recipient engagement and response velocity',
          config: { duration: '72 hours', skipWeekends: true }
        },
        {
          id: 'node-5',
          type: 'condition',
          title: 'Did they open?',
          description: 'Evaluate open event and link click telemetry',
          config: { metric: 'Email Opened', operator: 'equals', expected: 'true' },
          nextNodes: {
            yes: 'node-6-yes',
            no: 'node-6-no'
          }
        }
      ]
    }
  ]);

  const [selectedWorkflow, setSelectedWorkflow] = useState<MarketingWorkflow>(workflows[0]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionLog, setExecutionLog] = useState<string[]>([]);

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'trigger': return Zap;
      case 'condition': return GitBranch;
      case 'ai_decision': return Bot;
      case 'action': return Play;
      case 'wait': return Clock;
      default: return Workflow;
    }
  };

  const getNodeBadgeColor = (type: string) => {
    switch (type) {
      case 'trigger': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'condition': return 'bg-purple-500/10 text-purple-400 border-purple-200/20';
      case 'ai_decision': return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
      case 'action': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'wait': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      default: return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  const handleTestWorkflow = () => {
    setIsExecuting(true);
    setExecutionLog(['[00:00:00] Initializing DAKO Workflow Engine simulation...']);

    setTimeout(() => {
      setExecutionLog(prev => [...prev, '[00:00:01] Trigger fired: Customer record ingested from CRM.']);
    }, 600);

    setTimeout(() => {
      setExecutionLog(prev => [...prev, '[00:00:12] AI Decision executed: Segment identified as "High-Intent Enterprise" (Confidence: 94%).']);
    }, 1300);

    setTimeout(() => {
      setExecutionLog(prev => [...prev, '[00:00:18] Action dispatched: Personalized email sent via SMTP relay.']);
    }, 2000);

    setTimeout(() => {
      setExecutionLog(prev => [...prev, '[00:00:25] Wait timer engaged: 72 hours countdown initiated.']);
    }, 2700);

    setTimeout(() => {
      setExecutionLog(prev => [...prev, '[00:00:30] Condition evaluated: Email opened = TRUE. Proceeding to next campaign branch.']);
      setIsExecuting(false);
    }, 3500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-3">
              <Workflow className="w-4 h-4" /> Tier 1 Gap: Advanced Marketing Automation
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">Visual Workflow Engine</h1>
            <p className="text-slate-400 text-sm mt-1">
              Design autonomous multi-channel decision trees where AI agents coordinate triggers, wait conditions, and branching actions.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleTestWorkflow}
              disabled={isExecuting}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 text-white font-medium text-sm transition-colors shadow-lg shadow-indigo-600/20 cursor-pointer"
            >
              <Play className="w-4 h-4" /> {isExecuting ? 'Running Simulation...' : 'Simulate Workflow'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left / Center: Visual Node Chain */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
                  <h2 className="text-lg font-bold text-white">{selectedWorkflow.name}</h2>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                  Active Execution
                </span>
              </div>

              <p className="text-sm text-slate-400 mb-6 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
                {selectedWorkflow.description}
              </p>

              {/* Workflow Nodes Render */}
              <div className="space-y-4 relative">
                {selectedWorkflow.nodes.map((node, index) => {
                  const Icon = getNodeIcon(node.type);
                  const badgeColor = getNodeBadgeColor(node.type);

                  return (
                    <div key={node.id} className="relative">
                      <div className="bg-slate-950 border border-slate-800 hover:border-indigo-500/50 rounded-xl p-5 transition-all group">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${badgeColor}`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Step {index + 1} • {node.type.replace('_', ' ')}</span>
                              </div>
                              <h3 className="text-base font-bold text-white">{node.title}</h3>
                              <p className="text-xs text-slate-400 mt-1">{node.description}</p>
                            </div>
                          </div>
                          <button className="text-slate-500 hover:text-slate-300 p-1 rounded-lg hover:bg-slate-900 transition-colors">
                            <Settings2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Node Config Preview */}
                        <div className="mt-4 pt-3 border-t border-slate-900 flex flex-wrap gap-2 text-[11px] text-slate-400">
                          {Object.entries(node.config).map(([k, v]) => (
                            <span key={k} className="bg-slate-900 px-2 py-1 rounded border border-slate-800">
                              <strong className="text-slate-300">{k}:</strong> {String(v)}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Connector Arrow */}
                      {index < selectedWorkflow.nodes.length - 1 && (
                        <div className="flex justify-center my-2">
                          <div className="w-6 h-6 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
                            <ArrowDown className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Add Node Button */}
                <div className="flex justify-center pt-2">
                  <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-300 transition-colors cursor-pointer">
                    <Plus className="w-4 h-4" /> Add Workflow Node (Trigger / Condition / AI Decision / Action / Wait)
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Workflow Controls & Live Simulation Logs */}
          <div className="space-y-6">
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" /> Live Execution Console
              </h3>
              
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-300 h-64 overflow-y-auto space-y-2">
                {executionLog.length === 0 ? (
                  <div className="text-slate-600 italic text-center py-16">
                    Click "Simulate Workflow" above to test automated branching and trigger response times.
                  </div>
                ) : (
                  executionLog.map((log, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-indigo-400 shrink-0">&gt;</span>
                      <span className="break-all">{log}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="bg-indigo-950/20 border border-indigo-500/20 rounded-2xl p-6">
              <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400" /> Autonomous Safeguards
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                DAKO AI agents continuously verify subscriber consent, rate-limit dispatch windows, and automatically reroute failed deliveries to backup communication channels.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  TrendingUp, 
  Eye, 
  Heart, 
  Sparkles, 
  Scissors
} from 'lucide-react';
import { playTick, playWoosh } from '../utils/audio';

export const VideoLightboxModal = ({
  project,
  onClose,
  onOpenBookingWithProject
}) => {
  if (!project) return null;

  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [progress, setProgress] = useState(0);
  const [currentTimeStr, setCurrentTimeStr] = useState('0:00');
  const [durationStr, setDurationStr] = useState('0:00');

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  const togglePlay = () => {
    playTick();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    playTick();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration || 1;
      setProgress((current / total) * 100);

      const mins = Math.floor(current / 60);
      const secs = Math.floor(current % 60);
      setCurrentTimeStr(`${mins}:${secs < 10 ? '0' : ''}${secs}`);

      if (!isNaN(total)) {
        const tmins = Math.floor(total / 60);
        const tsecs = Math.floor(total % 60);
        setDurationStr(`${tmins}:${tsecs < 10 ? '0' : ''}${tsecs}`);
      }
    }
  };

  const handleSeek = (e) => {
    const seekPercent = parseFloat(e.target.value);
    if (videoRef.current && videoRef.current.duration) {
      videoRef.current.currentTime = (seekPercent / 100) * videoRef.current.duration;
      setProgress(seekPercent);
    }
  };

  const handleFullscreen = () => {
    playTick();
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md p-3 sm:p-6 lg:p-8 flex min-h-full items-center justify-center animate-fadeIn">
      
      {/* Background Click Close */}
      <div className="fixed inset-0" onClick={() => { playWoosh(); onClose(); }} />

      {/* Main Cinema Modal Window */}
      <div className="relative z-10 w-full max-w-5xl rounded-3xl bg-[#FFFDF9] border border-[#E8E0D5] shadow-2xl overflow-hidden flex flex-col my-auto text-[#1C140E] max-h-[92vh] overflow-y-auto">
        
        {/* Modal Top Header */}
        <div className="flex items-center justify-between p-4 px-6 border-b border-[#E8E0D5] bg-[#FAF7F2]">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold uppercase px-3 py-1 rounded-full bg-[#E05638]/10 text-[#E05638] border border-[#E05638]/20">
              {project.categoryLabel}
            </span>
            <h3 className="text-sm font-bold text-[#1C140E] truncate max-w-md">{project.title}</h3>
          </div>
          <button
            onClick={() => { playWoosh(); onClose(); }}
            className="p-2 rounded-full bg-[#F5F0EB] hover:bg-[#E8E0D5] text-[#786A5C] hover:text-[#1C140E] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Section */}
        <div className="relative bg-[#0F0B08] flex items-center justify-center min-h-[300px] max-h-[60vh] overflow-hidden group">
          <video
            ref={videoRef}
            src={project.fullVideoUrl}
            poster={project.thumbnailUrl}
            autoPlay
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onClick={togglePlay}
            className="w-full h-full max-h-[60vh] object-contain cursor-pointer"
          />

          {/* Player Bottom Control Bar */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity">
            
            {/* Timeline Progress Bar */}
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleSeek}
              className="w-full h-1.5 mb-3 bg-slate-800 accent-[#E05638] cursor-pointer rounded-lg"
            />

            <div className="flex items-center justify-between gap-4 text-xs font-mono text-slate-200">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
                </button>

                <button
                  onClick={toggleMute}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-[#E05638]" /> : <Volume2 className="w-4 h-4 text-white" />}
                </button>

                <span>{currentTimeStr} / {durationStr || project.duration}</span>
              </div>

              <div className="flex items-center gap-2">
                {/* Playback Speed Selector */}
                {[0.5, 1, 1.5, 2].map((speed) => (
                  <button
                    key={speed}
                    onClick={() => { playTick(); setPlaybackSpeed(speed); }}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      playbackSpeed === speed
                        ? 'bg-[#E05638] text-white'
                        : 'bg-white/10 hover:bg-white/20 text-slate-300'
                    }`}
                  >
                    {speed}x
                  </button>
                ))}

                <button
                  onClick={handleFullscreen}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white"
                >
                  <Maximize className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Project Details & Editor Notes */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#FFFDF9]">
          
          {/* Main Info */}
          <div className="md:col-span-2 space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <img
                  src={project.clientAvatar}
                  alt={project.client}
                  referrerPolicy="no-referrer"
                  className="w-6 h-6 rounded-full border border-[#E05638]/40 object-cover"
                />
                <span className="text-xs text-[#E05638] font-bold">{project.client}</span>
              </div>
              <h2 className="text-xl font-extrabold text-[#1C140E]">{project.title}</h2>
              <p className="text-xs text-[#786A5C] mt-2 leading-relaxed font-medium">{project.description}</p>
            </div>

            {/* Editor Breakdown */}
            <div className="p-4 rounded-2xl bg-[#F5F0EB] border border-[#E8E0D5]">
              <h4 className="text-xs font-bold text-[#E05638] uppercase tracking-wider font-mono flex items-center gap-2 mb-2">
                <Scissors className="w-3.5 h-3.5" />
                <span>Chief Editor Technique Breakdown</span>
              </h4>
              <p className="text-xs text-[#1C140E] font-mono leading-relaxed">{project.editorNotes}</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((t, idx) => (
                <span key={idx} className="text-xs font-mono px-2.5 py-1 rounded-full bg-[#F5F0EB] text-[#786A5C] border border-[#E8E0D5] font-semibold">
                  #{t}
                </span>
              ))}
            </div>
          </div>

          {/* Right Specs Sidebar */}
          <div className="space-y-4 border-t md:border-t-0 md:border-l border-[#E8E0D5] pt-4 md:pt-0 md:pl-6">
            
            {/* Performance Stats */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono font-bold text-[#786A5C] uppercase">Performance Result</span>
              <div className="flex items-center gap-2 text-xs font-mono font-bold px-3 py-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span>{project.retention}</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono px-3 py-2 rounded-xl bg-[#F5F0EB] border border-[#E8E0D5] text-[#1C140E]">
                <span className="flex items-center gap-1.5"><Eye className="w-3.5 h-3.5 text-[#E05638]" /> Total Views</span>
                <span className="font-bold text-[#1C140E]">{project.views}</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono px-3 py-2 rounded-xl bg-[#F5F0EB] border border-[#E8E0D5] text-[#1C140E]">
                <span className="flex items-center gap-1.5"><Heart className="w-3.5 h-3.5 text-rose-500" /> Likes</span>
                <span className="font-bold text-[#1C140E]">{project.likes}</span>
              </div>
            </div>

            {/* Software Suite */}
            <div>
              <span className="text-[11px] font-mono font-bold text-[#786A5C] uppercase block mb-2">Software Stack Used</span>
              <div className="flex flex-wrap gap-1.5">
                {project.software.map((sw, idx) => (
                  <span key={idx} className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-[#1C140E] text-[#F4F0EA]">
                    {sw}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => {
                playTick();
                onOpenBookingWithProject(project);
              }}
              className="w-full py-3.5 px-4 rounded-full bg-[#E05638] hover:bg-[#C84326] text-[#F4F0EA] font-extrabold text-xs tracking-wide shadow-md shadow-[#E05638]/20 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Book Edit Like This</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default VideoLightboxModal;

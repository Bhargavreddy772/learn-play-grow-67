import React, { useState } from 'react';
import { Play, Clock, CheckCircle2, Lock, PlayCircle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface Video {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  subject: 'math' | 'english' | 'science' | 'art';
  completed: boolean;
  locked: boolean;
  progress?: number;
}

const videos: Video[] = [
  {
    id: '1',
    title: 'Fun with Numbers! 🔢',
    duration: '5:30',
    thumbnail: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400&h=225&fit=crop',
    subject: 'math',
    completed: true,
    locked: false,
  },
  {
    id: '2',
    title: 'Addition Adventures',
    duration: '7:15',
    thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=225&fit=crop',
    subject: 'math',
    completed: true,
    locked: false,
  },
  {
    id: '3',
    title: 'Story Time: The Magic Tree',
    duration: '10:00',
    thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=225&fit=crop',
    subject: 'english',
    completed: false,
    locked: false,
    progress: 45,
  },
  {
    id: '4',
    title: 'Amazing Animals 🦁',
    duration: '8:45',
    thumbnail: 'https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=400&h=225&fit=crop',
    subject: 'science',
    completed: false,
    locked: false,
  },
  {
    id: '5',
    title: 'Colors & Painting 🎨',
    duration: '12:00',
    thumbnail: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=225&fit=crop',
    subject: 'art',
    completed: false,
    locked: true,
  },
];

const subjectColors = {
  math: 'from-student-blue to-student-purple',
  english: 'from-student-orange to-student-yellow',
  science: 'from-student-green to-student-cyan',
  art: 'from-student-pink to-student-purple',
};

interface VideoLearningProps {
  className?: string;
}

export const VideoLearning: React.FC<VideoLearningProps> = ({ className }) => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videosState, setVideosState] = useState<Video[]>(videos);

  React.useEffect(() => {
    (async () => {
      try {
        const remote = await (await import('@/lib/api')).default.getVideos('u1');
        if (remote && Array.isArray(remote)) setVideosState(remote);
      } catch (err) {
        // keep fallback videos
      }
    })();
  }, []);

  const handlePlayVideo = (video: Video) => {
    if (!video.locked) {
      setSelectedVideo(video);
      setIsPlaying(true);
    }
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Featured / Now Playing */}
      {selectedVideo && isPlaying ? (
        <div className="relative rounded-3xl overflow-hidden bg-black aspect-video animate-fade-in">
          <img
            src={selectedVideo.thumbnail}
            alt={selectedVideo.title}
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 animate-pulse">
              <Play className="w-10 h-10 text-white fill-white" />
            </div>
            <p className="text-white font-display font-bold text-xl">{selectedVideo.title}</p>
            <p className="text-white/70 text-sm mt-2">Now Playing...</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4 bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={() => setIsPlaying(false)}
            >
              Close Video
            </Button>
          </div>
        </div>
      ) : (
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-student-purple to-student-blue aspect-video group cursor-pointer"
          onClick={() => videosState[2] && handlePlayVideo(videosState[2])}
        >
          <img
            src={videosState[2]?.thumbnail}
            alt="Continue watching"
            className="w-full h-full object-cover opacity-50 group-hover:opacity-40 transition-opacity"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <PlayCircle className="w-12 h-12 text-white" />
            </div>
            <p className="text-white font-display font-bold text-xl">Continue Watching</p>
            <p className="text-white/80 text-sm mt-1">{videosState[2]?.title}</p>
            {videosState[2]?.progress && (
              <div className="w-48 mt-4">
                <Progress value={videosState[2].progress} className="h-2 bg-white/20" />
                <p className="text-white/70 text-xs text-center mt-1">{videosState[2].progress}% complete</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Video List */}
      <div>
        <h3 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <Play className="w-5 h-5 text-student-purple" />
          Video Lessons
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {videosState.map((video) => (
            <div
              key={video.id}
              className={cn(
                'group relative rounded-2xl overflow-hidden border-2 transition-all duration-300',
                video.locked
                  ? 'border-muted opacity-60 cursor-not-allowed'
                  : 'border-border hover:border-student-purple hover:shadow-lg cursor-pointer hover:scale-[1.02]'
              )}
                  onClick={() => handlePlayVideo(video)}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className={cn(
                  'absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent',
                  !video.locked && 'group-hover:from-black/90'
                )} />
                
                {/* Play button overlay */}
                {!video.locked && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                      <Play className="w-6 h-6 text-student-purple fill-student-purple ml-1" />
                    </div>
                  </div>
                )}

                {/* Lock overlay */}
                {video.locked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <Lock className="w-10 h-10 text-white/80" />
                  </div>
                )}

                {/* Completed badge */}
                {video.completed && (
                  <div className="absolute top-3 right-3">
                    <div className="flex items-center gap-1 bg-student-green text-white px-2 py-1 rounded-full text-xs font-bold">
                      <CheckCircle2 className="w-3 h-3" />
                      Done!
                    </div>
                  </div>
                )}

                {/* Subject badge */}
                <div className={cn(
                  'absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r',
                  subjectColors[video.subject]
                )}>
                  {video.subject.charAt(0).toUpperCase() + video.subject.slice(1)}
                </div>

                {/* Duration */}
                <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/70 text-white px-2 py-1 rounded-lg text-xs">
                  <Clock className="w-3 h-3" />
                  {video.duration}
                </div>

                {/* Progress bar for in-progress videos */}
                {video.progress && !video.completed && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/50">
                    <div 
                      className="h-full bg-student-orange"
                      style={{ width: `${video.progress}%` }}
                    />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-4 bg-card">
                <h4 className="font-display font-bold text-foreground group-hover:text-student-purple transition-colors">
                  {video.title}
                </h4>
                <div className="flex items-center gap-2 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={cn(
                        'w-4 h-4',
                        star <= 4 ? 'text-student-yellow fill-student-yellow' : 'text-muted'
                      )}
                    />
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">(4.0)</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

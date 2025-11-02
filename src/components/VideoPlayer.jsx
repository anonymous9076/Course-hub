import {
  MediaController,
  MediaControlBar,
  MediaTimeRange,
  MediaTimeDisplay,
  MediaVolumeRange,
  MediaPlaybackRateButton,
  MediaPlayButton,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaMuteButton,
  MediaFullscreenButton,
} from "media-chrome/react";

const Player = ({
  src,
  poster,
  aspectRatio = "16/8",
  width = "100%",
  autoPlay = false,
  loop = false,
}) => {
  if (!src) {
    return (
      <div
        className="flex items-center justify-center text-4xl rounded-[20px] bg-white text-gray-600 "
        style={{ aspectRatio, width }}
      >
        🎞️ Video not found
      </div>
    );
  }

  return (
    <MediaController
      style={{
        width,
        aspectRatio,
        borderRadius: "20px",
        overflow: "hidden",
        backgroundColor: "black",
      }}
    >
      <video
        slot="media"
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        loop={loop}
        playsInline
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <MediaControlBar className="bg-black/80 px-5 gap-3">
        <MediaPlayButton className="bg-transparent"/>
        <MediaSeekBackwardButton className="bg-transparent" seekOffset={10} />
        <MediaSeekForwardButton className="bg-transparent" seekOffset={10} />
        <MediaTimeRange className="bg-transparent" />
        <MediaTimeDisplay showDuration className="bg-transparent" />
        <MediaMuteButton className="bg-transparent"/>
        <MediaVolumeRange className="bg-transparent"/>
        <MediaPlaybackRateButton className="bg-transparent"/>
        <MediaFullscreenButton className="bg-transparent"/>
      </MediaControlBar>
    </MediaController>
  );
};

export default Player;

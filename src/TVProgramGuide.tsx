// TVProgramGuide.tsx
import React, { useState, useEffect, useRef } from "react";
import { ChannelType } from "./types";
import { fetchChannelData } from "./fakeAPI";

const TVProgramGuide: React.FC = () => {
  const [channels, setChannels] = useState<ChannelType[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Function to load a single channel's data
  const loadChannelData = (channelId: number) => {
    setLoading(true);
    fetchChannelData(channelId)
      .then((data) => {
        setChannels((prevChannels) => [...prevChannels, { id: channelId, emissions: data }]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Load multiple channels (5 channels by default)
  const loadMultipleChannels = () => {
    for (let i = 1; i <= 5; i++) {
      loadChannelData(i);
    }
  };

  // Handle horizontal scroll event
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;

      // Trigger fetch when scroll reaches near the end (infinite scroll)
      if (scrollLeft + clientWidth >= scrollWidth - 200) {
        const nextChannelId = channels.length + 1;
        if (!loading) {
          loadChannelData(nextChannelId);
        }
      }
    }
  };

  useEffect(() => {
    loadMultipleChannels(); // Initially load 5 channels
  }, []);

  return (
    <div>
      <h1>TV Program Guide</h1>
      <div
        ref={scrollContainerRef}
        style={{
          display: "flex",
          overflowX: "scroll",
          paddingBottom: "10px",
        }}
        onScroll={handleScroll}
      >
        {channels.map((channel) => (
          <div
            key={channel.id}
            style={{
              flexShrink: 0,
              width: "200px",
              marginRight: "10px",
              border: "1px solid #ddd",
            }}
          >
            <h2>Channel {channel.id}</h2>
            <div>
              {channel.emissions.map((emission, index) => (
                <div key={index} style={{ marginBottom: "10px" }}>
                  <img src={emission.imageUrl} alt={emission.title} style={{ width: "100%", borderRadius: "8px" }} />
                  <h3>{emission.title}</h3>
                  <p>{emission.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
        {loading && <div>Loading...</div>}
      </div>
    </div>
  );
};

export default TVProgramGuide;

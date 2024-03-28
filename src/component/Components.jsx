import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';

// Based on Material Design spec:
// Styles by https://github.com/RafeSacks
// https://material.io/design/components/sliders.html#spec
const trackHeight = 2;
const thumbHeight = 12;

// *******************************************************
// RAIL COMPONENT
// *******************************************************

const Rail = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.grey[400],
  width: "100%",
  height: trackHeight,
  position: "absolute",
  pointerEvents: "none"
}));

const RailHotspot = styled('div')(({ theme }) => ({
  width: "100%",
  height: thumbHeight * 2, // Invisible hotspot same size as thumb
  top: thumbHeight * -1,
  position: "absolute",
  cursor: "pointer"
}));

function MuiRailComponent({ getRailProps }) {
  return (
    <Fragment>
      <RailHotspot {...getRailProps()} />
      <Rail />
    </Fragment>
  );
}

MuiRailComponent.propTypes = {
  getRailProps: PropTypes.func.isRequired
};

export const MuiRail = MuiRailComponent;

// *******************************************************
// HANDLE COMPONENT
// *******************************************************

const HandleRoot = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  marginLeft: thumbHeight * -0.5,
  marginTop: thumbHeight * -0.5,
  width: thumbHeight,
  height: thumbHeight,
  border: 0,
  borderRadius: "50%", // circle
  // boxShadow: "1px 1px 1px 1px rgba(0, 0, 0, 0.2)",
  whiteSpace: "nowrap", // for child display inline-block to work
  position: "absolute",
  zIndex: 2,
  cursor: "pointer"
}));

function MuiHandleComponent({
  handle: { percent },
  getHandleProps
}) {
  return (
    <HandleRoot style={{ left: `${percent}%` }} {...getHandleProps()} />
  );
}

MuiHandleComponent.propTypes = {
  handle: PropTypes.shape({
    percent: PropTypes.number.isRequired
  }).isRequired,
  getHandleProps: PropTypes.func.isRequired
};

export const MuiHandle = MuiHandleComponent;

// *******************************************************
// TRACK COMPONENT
// *******************************************************

const Track = styled('div')(({ theme, source, target }) => ({
  backgroundColor: theme.palette.secondary.main,
  height: trackHeight,
  position: "absolute",
  zIndex: 1,
  pointerEvents: "none",
  left: `${source.percent}%`,
  width: `${target.percent - source.percent}%`
}));

const TrackHotspot = styled('div')(({ theme, source, target }) => ({
  height: thumbHeight, // Invisible hotspot same size as thumb
  top: thumbHeight * -0.5,
  position: "absolute",
  cursor: "pointer",
  left: `${source.percent}%`,
  width: `${target.percent - source.percent}%`
}));

function MuiTrackComponent({ source, target, getTrackProps }) {
  return (
    <Fragment>
      <Track />
      <TrackHotspot {...getTrackProps()} />
    </Fragment>
  );
}

MuiTrackComponent.propTypes = {
  source: PropTypes.shape({
    percent: PropTypes.number.isRequired
  }).isRequired,
  target: PropTypes.shape({
    percent: PropTypes.number.isRequired
  }).isRequired,
  getTrackProps: PropTypes.func.isRequired
};

export const MuiTrack = MuiTrackComponent;

// *******************************************************
// TICK COMPONENT
// *******************************************************

const Tick = styled('div')(({ theme, tick }) => ({
  position: "absolute",
  marginTop: 14,
  width: 1,
  height: 5,
  backgroundColor: theme.palette.grey[400],
  left: `${tick.percent}%`
}));

export function MuiTickComponent({ tick, count, format }) {
  return (
    <div>
      <Tick />
      <Typography
        variant="caption"
        style={{
          marginLeft: `${-(100 / count) / 2}%`,
          width: `${100 / count}%`,
          left: `${tick.percent}%`
        }}
      >
        {format(tick.value)}
      </Typography>
    </div>
  );
}

MuiTickComponent.propTypes = {
  tick: PropTypes.shape({
    percent: PropTypes.number.isRequired
  }).isRequired,
  count: PropTypes.number.isRequired,
  format: PropTypes.func.isRequired
};

MuiTickComponent.defaultProps = {
  format: d => d
};

export const MuiTick = MuiTickComponent;

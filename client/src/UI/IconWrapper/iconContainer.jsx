import React from "react";

const IcoBg = ({ dataId }) => (
  <svg x="0px" y="0px" width="100%" height="100%" viewBox="0 0 206 206">
    <defs>
      <linearGradient
        id={"gradientMain" + dataId}
        gradientUnits="userSpaceOnUse"
        x1="102.958"
        y1="2"
        x2="102.958"
        y2="207.232"
      >
        <stop offset="0" style={{ stopColor: "#492F79" }} />
        <stop offset="0.35" style={{ stopColor: "#30105c" }} />
        <stop offset="0.6646" style={{ stopColor: "#142973" }} />
        <stop offset="0.8128" style={{ stopColor: "#264C9D" }} />
        <stop offset="1" style={{ stopColor: "#90D4E4" }} />
      </linearGradient>
      <linearGradient
        id={"gradientBorder" + dataId}
        gradientUnits="userSpaceOnUse"
        x1="102"
        y1="-60.3632"
        x2="102"
        y2="81.8895"
        gradientTransform="matrix(1 0 0 -1 0 207.5)"
      >
        <stop offset="0" style={{ stopColor: "#FFFFFF", stopOpacity: "1" }} />
        <stop
          offset="0.441"
          style={{ stopColor: "#FFFFFF", stopOpacity: "1" }}
        />
        <stop offset="0.6436" style={{ stopColor: "#17669D" }} />
        <stop offset="0.8428" style={{ stopColor: "#FFFFFF" }} />
        <stop offset="1" style={{ stopColor: "#17669D" }} />
      </linearGradient>
    </defs>
    <g transform="translate(0 7)">
      <path
        className="helperRectBorder"
        fill="none"
        d="M103,2l102.6,102.6L103,207.2L0.4,104.6L103,2z"
      />
    </g>
    <path
      className="helperRect"
      fill={"url(#gradientMain" + dataId + ")"}
      d="M103,2l102.6,102.6L103,207.2L0.4,104.6L103,2z"
    />
    <path
      className="helperRect"
      fill={"url(#gradientMain" + dataId + ")"}
      d="M103,2l102.6,102.6L103,207.2L0.4,104.6L103,2z"
    />
    <defs>
      <linearGradient
        id={"gradientIcon" + dataId}
        gradientUnits="userSpaceOnUse"
        x1="24.398"
        y1="2.2275"
        x2="4.8665"
        y2="36.057"
        gradientTransform="matrix(1 0 0 -1 0 48)"
      >
        <stop offset="0" style={{ stopColor: "#C2D7E5" }} />
        <stop offset="0.6256" style={{ stopColor: "#FFFFFF" }} />
      </linearGradient>
    </defs>
  </svg>
);

export default IcoBg;

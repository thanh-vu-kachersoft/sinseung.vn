"use client";

import React from "react";
import AiChatWindow from "./AiChatWindow";

export default function FloatingContact() {
  return (
    <div className="fixed right-6 bottom-10 flex flex-col gap-4 z-[9999]">
      {/* Messenger Icon (Top) */}
      <a
        href="https://m.me/phuthaitechnology?text=Xin%20ch%C3%A0o%21%20T%C3%B4i%20c%E1%BA%A7n%20h%E1%BB%97%20tr%E1%BB%A3"
        target="_blank"
        rel="noopener noreferrer"
        className="w-16 h-16 transition-transform duration-300 hover:scale-110 drop-shadow-xl block"
        title="Messenger"
      >
        <svg viewBox="0 0 1000 1000" className="w-full h-full">
          <g transform="translate(-0.940002,-0.91)">
            <path
              d="m 1000.94,485.90553 c 0,278.68297 -218.33611,484.99554 -500.00001,484.99554 -50.58364,0 -99.1207,-6.66838 -144.74082,-19.2103 -8.86599,-2.45104 -18.28875,-1.75604 -26.70037,1.94548 l -99.24741,43.81288 c -25.95418,11.46807 -55.25663,-6.99732 -56.12697,-35.36414 l -2.72879,-88.95303 C 171.05517,862.18098 166.12877,851.925 157.95777,844.63842 60.667611,757.62959 0.940002,631.68181 0.940002,485.90553 0.940002,207.23536 219.27609,0.91 500.93999,0.91 782.60389,0.91 1000.94,207.23536 1000.94,485.90553 Z"
              fill="#0866ff"
            ></path>
            <path
              d="M 636.7009,625.519 810.78129,356.48533 c 17.50544,-27.04083 -14.91617,-58.51529 -41.42711,-40.22782 l -181.7215,125.3411 c -6.12569,4.23141 -14.19685,4.34532 -20.43517,0.30334 L 405.91119,337.55278 c -13.65289,-8.82887 -31.87892,-4.9264 -40.70652,8.72649 L 191.11149,615.32573 c -17.50544,27.04083 14.91617,58.5153 41.42583,40.22655 L 414.29721,530.19966 c 6.12569,-4.23141 14.19685,-4.34532 20.44797,-0.30334 l 161.26073,104.34916 c 13.65416,8.82888 31.87892,4.92641 40.70779,-8.72648 z"
              fill="#ffffff"
            ></path>
          </g>
        </svg>
      </a>

      {/* Zalo Icon (Middle) */}
      <a
        href="https://zalo.me/1149657744507910410"
        target="_blank"
        rel="noopener noreferrer"
        className="w-16 h-16 transition-transform duration-300 hover:scale-110 drop-shadow-xl block"
        title="Zalo"
      >
        <img
          src="https://page.widget.zalo.me/static/images/2.0/Logo.svg"
          alt="Zalo"
          className="w-full h-full"
        />
      </a>

      {/* AI Assistant (Bottom) */}
      <AiChatWindow />
    </div>
  );
}

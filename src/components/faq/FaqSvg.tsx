import React from 'react'

export const FaqSvg = () => {
	return (
		<svg
			width="102"
			height="102"
			viewBox="0 0 102 102"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g filter="url(#filter0_d_305_2032)">
				<circle cx="49" cy="44" r="31" fill="#004EC2" />
			</g>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M54.4056 32.145H59.4223C60.8991 32.145 62.0933 33.3444 62.0933 34.8188V58.5164C62.0933 59.7087 60.6518 60.3013 59.811 59.4617L56.4173 53.9518H38.5778C37.101 53.9518 35.9069 52.7596 35.9069 51.2851V46.2761H35.9636L35.9141 46.269V34.8188C35.907 33.3444 37.1012 32.145 38.5779 32.145H54.4055H54.4056Z"
				fill="white"
			/>
			<defs>
				<filter
					id="filter0_d_305_2032"
					x="0"
					y="0"
					width="102"
					height="102"
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB"
				>
					<feFlood floodOpacity="0" result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feMorphology
						radius="3"
						operator="dilate"
						in="SourceAlpha"
						result="effect1_dropShadow_305_2032"
					/>
					<feOffset dx="2" dy="7" />
					<feGaussianBlur stdDeviation="8.5" />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.22 0"
					/>
					<feBlend
						mode="normal"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_305_2032"
					/>
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_305_2032"
						result="shape"
					/>
				</filter>
			</defs>
		</svg>
	)
}

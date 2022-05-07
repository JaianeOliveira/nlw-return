import { useState } from 'react';
import Loading from '../Loading';

import html2canvas from 'html2canvas';
import { Camera, Trash } from 'phosphor-react';

interface ScreenshotButtonProps {
	onScreenshotTook: (screenshot: string | null) => void;
	screenshot: string | null;
}

const ScreenshotButton = ({
	onScreenshotTook,
	screenshot,
}: ScreenshotButtonProps) => {
	const [isTakingScreenshot, setIsTakingScreenshot] = useState(false);
	const handleTakeScreenshot = async () => {
		setIsTakingScreenshot(true);

		const canvas = await html2canvas(document.querySelector('html')!);
		const base64Image = canvas.toDataURL('image/png');

		onScreenshotTook(base64Image);

		setIsTakingScreenshot(false);
	};
	if (screenshot) {
		return (
			<button
				type="button"
				className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transitions-colors "
				style={{
					backgroundImage: `url(${screenshot})`,
				}}
				onClick={() => onScreenshotTook(null)}
			>
				<Trash weight="fill" />
			</button>
		);
	}
	return (
		<button
			type="button"
			onClick={handleTakeScreenshot}
			className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 transition-colors  focus:outline-none focus:ring-2 focus:ring-offset-2focus:ring-offset-zinc-800 focus:ring-brand-500"
		>
			{isTakingScreenshot ? <Loading /> : <Camera className="w-6 h-6" />}
		</button>
	);
};

export default ScreenshotButton;

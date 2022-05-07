import { FormEvent, useState } from 'react';
import CloseButton from '../../../CloseButton';
import ScreenshotButton from '../../../ScreenshotButton';
import { FeedbackType } from '../../../../utils/types';
import feedbackTypes from '../../../../utils/data/feedbackTypes';
import { ArrowLeft } from 'phosphor-react';

interface FeedbackContentStepProps {
	onFeedbackSend: () => void;
	feedbackType: FeedbackType;
	onFeedbackRestartRequested: () => void;
}

const FeedbackContentStep = ({
	feedbackType,
	onFeedbackRestartRequested,
	onFeedbackSend,
}: FeedbackContentStepProps) => {
	const feedbackTypeInfo = feedbackTypes[feedbackType];
	const [screenshot, setScreenshot] = useState<string | null>(null);
	const [comment, setComment] = useState('');

	const handleSubmitFeedback = (e: FormEvent) => {
		e.preventDefault();
		console.log(screenshot, comment);
		setScreenshot(null);
		setComment('');
		onFeedbackSend();
	};
	return (
		<>
			<header>
				<button
					onClick={onFeedbackRestartRequested}
					type="button"
					className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
				>
					<ArrowLeft weight="bold" className="h-4 w-4" />
				</button>
				<span className="text-xl leading-6 flex items-center gap-2">
					<img
						src={feedbackTypeInfo.image.source}
						alt={feedbackTypeInfo.image.alt}
						className="w-6 h-6"
					/>
					{feedbackTypeInfo.title}
				</span>
				<CloseButton />
			</header>
			<form onSubmit={handleSubmitFeedback} className="my-4 w-full">
				<textarea
					className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:outline-none focus:ring-brand-500 focus:ring-1 resize-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
					placeholder="Conte com detalhes o que está acontecendo..."
					value={comment}
					onChange={(e) => setComment(e.target.value)}
				/>

				<footer className="flex gap-2 mt-2">
					<ScreenshotButton
						screenshot={screenshot}
						onScreenshotTook={setScreenshot}
					/>
					<button
						type="submit"
						disabled={comment.length ? false : true}
						className="transition-colors p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-800 focus:ring-brand-500 disabled:opacity-50 disabled:hover:bg-brand-500"
					>
						Enviar Feedback
					</button>
				</footer>
			</form>
		</>
	);
};

export default FeedbackContentStep;

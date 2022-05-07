import { useState } from 'react';

import FeedbackTypeStep from './Steps/FeedbackTypeStep';
import FeedbackContentStep from './Steps/FeedbackContentStep';

import { FeedbackType } from '../../utils/types';
import FeedbackSuccessStep from './Steps/FeedbackSuccessStep';

const WidgetForm = () => {
	const [feedbackType, setFeedbackType] = useState<null | FeedbackType>(null);
	const [feedbackSend, setFeedbackSend] = useState(false);

	const restartFeedbackHandler = () => {
		setFeedbackType(null);
		setFeedbackSend(false);
	};

	return (
		<div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto ">
			{feedbackSend ? (
				<FeedbackSuccessStep
					onFeedbackRestartRequested={restartFeedbackHandler}
				/>
			) : (
				<>
					{!feedbackType ? (
						<FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
					) : (
						<FeedbackContentStep
							onFeedbackSend={() => setFeedbackSend(true)}
							feedbackType={feedbackType}
							onFeedbackRestartRequested={restartFeedbackHandler}
						/>
					)}
				</>
			)}
			<footer className="text-xs text-neutral-400">
				Feito com 💜 pela{' '}
				<a
					className="underline underline-offset-2"
					href="https://rocketseat.com.br/"
					target="_blank"
				>
					Rocketseat
				</a>
			</footer>
		</div>
	);
};

export default WidgetForm;

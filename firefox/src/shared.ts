

const OPTION_CLIP_LINK = 'OPTION_CLIP_LINK';
const OPTION_CLIP_SELECTION = 'OPTION_CLIP_SELECTION';
const OPTION_CLIP_PAGE = 'OPTION_CLIP_PAGE';

type ClipOption
	= typeof OPTION_CLIP_LINK
	| typeof OPTION_CLIP_SELECTION
	| typeof OPTION_CLIP_PAGE


interface Clipping {
	title: string;
	content: string;
}

const MESSAGE_GET_OPTIONS = 'MESSAGE_GET_OPTIONS';
const MESSAGE_SELECT_OPTION = 'MESSAGE_SELECT_OPTION';
const MESSAGE_SEND_CLIP = 'MESSAGE_SEND_CLIP';

type MessageType
	= typeof MESSAGE_GET_OPTIONS
	| typeof MESSAGE_SELECT_OPTION
	| typeof MESSAGE_SEND_CLIP

interface Message {
	messageType: MessageType
}

interface GetOptionsMessage extends Message{
	messageType: typeof MESSAGE_GET_OPTIONS;
	value: ClipOption[]
}

interface SelectOptionMessage extends Message{
	messageType: typeof MESSAGE_SELECT_OPTION;
	value: ClipOption
}
interface SendClipMessage extends Message{
	messageType: typeof MESSAGE_SELECT_OPTION;
	value: Clipping
}

export {
	  ClipOption
	, Message
	, MessageType
	, MESSAGE_SELECT_OPTION
	, MESSAGE_GET_OPTIONS
	, MESSAGE_SEND_CLIP
	, GetOptionsMessage
	, SelectOptionMessage
	, SendClipMessage
	, Clipping
	, OPTION_CLIP_PAGE
	, OPTION_CLIP_SELECTION
	, OPTION_CLIP_LINK
}




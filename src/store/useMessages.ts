import axios from 'axios';
import { toast } from 'sonner';
import { create } from 'zustand'

interface Message {
    _id: string,
    text: string,
    createdAt: string,
}

interface Messages {
    messages: Message[],
    fetchMessages: () => Promise<void>,
    loading: boolean,
}

const useMessages = create<Messages>((set) => ({
    messages: [],
    loading: false,

    fetchMessages: async () => {
        set(() => ({ loading: true }))
        try {
            const response = await axios.get<{ messages: Message[] }>('/api/accept-message');
            set(() => ({ messages: response.data.messages }))

        } catch (error) {
            console.error("Message Fetching Error: ", error);
            if (axios.isAxiosError(error) && error.response?.data) {
                toast.error(error.response.data.message);
            }
        } finally {
            set(() => ({ loading: false }))
        }
    }
}))

export default useMessages;
import axios from 'axios';
import { toast } from 'sonner';
import { create } from 'zustand'

interface Message {
    _id: string,
    text: string,
    createdAt: string,
}

interface Messages {
    acceptMessage: boolean;
    messages: Message[];
    fetchMessages: () => Promise<void>;
    deleteMessage: (id: string) => Promise<void>;
    loading: boolean;
}

const useMessages = create<Messages>((set, get) => ({
    messages: [],
    acceptMessage: false,
    loading: false,
    fetchMessages: async () => {
        set(() => ({ loading: true }))
        try {
            const response = await axios.get<{ data: { acceptMessage: boolean, messages: Message[] } }>('/api/accept-message');

            set(() => ({ acceptMessage: response.data.data.acceptMessage }));

            set(() => ({ messages: response.data.data.messages }))

        } catch (error) {
            console.error("Message Fetching Error: ", error);
            if (axios.isAxiosError(error) && error.response?.data) {
                toast.error(error.response.data.message);
            }
        } finally {
            set(() => ({ loading: false }))
        }
    },
    deleteMessage: async (id: string) => {
        const prevMessages = [...get().messages];
        set((state) => ({ messages: state.messages.filter((message) => message._id !== id) }))
        try {
            await axios.delete(`/api/delete-message/${id}`);
        } catch (error) {
            set(() => ({ messages: prevMessages }));
            console.error("Message Deleting Error: ", error);
            if (axios.isAxiosError(error) && error.response?.data) {
                toast.error(error.response.data.message);
            }
        }
    },
}))

export default useMessages;
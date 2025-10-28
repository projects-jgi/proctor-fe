import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState: {
    audio_access: boolean | null,
    video_access: boolean | null,
    full_screen: boolean | null,
    online_status: boolean | null,
    is_eligible: boolean,
} = {
    audio_access: null,
    video_access: null,
    full_screen: null,
    online_status: null,
    is_eligible: false,
}

const slice = createSlice({
    name: 'exam_eligibility_test',
    initialState,
    reducers: {
        setAudioAccess(state, action: PayloadAction<boolean>){
            state.audio_access = action.payload;
            if(action.payload == false){
                state.is_eligible = false;
            }
        },
        setVideoAccess(state, action: PayloadAction<boolean>){
            state.video_access = action.payload;

            if(action.payload == false){
                state.is_eligible = false;
            }
        },
        setFullScreen(state, action: PayloadAction<boolean>){
            state.full_screen = action.payload

            if(action.payload == false){
                state.is_eligible = false;
            }            
        },
        setOnlineStatus(state, action: PayloadAction<boolean>){
            state.online_status = action.payload;

            if(action.payload == false){
                state.is_eligible = false;
            }
        },
        setIsEligible(state, action: PayloadAction<boolean>){
            state.is_eligible = action.payload
        }
    }
})

export const { setAudioAccess, setVideoAccess, setFullScreen, setOnlineStatus, setIsEligible } = slice.actions;
export default slice.reducer;
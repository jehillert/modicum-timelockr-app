import { AppStateStatus } from 'react-native';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrNull } from '@types';

type FocusState = 'blur' | 'focus';

interface IAppState {
    appState: AppStateStatus;
    focusState: 'blur' | 'focus';
    memoryUse: string;
    hasNetAccess: OrNull<boolean>;
}

const initialState: IAppState = {
    appState: 'background',
    focusState: 'blur',
    memoryUse: '0 MB',
    hasNetAccess: null,
};

const systemSlice = createSlice({
    name: 'system',
    initialState,
    reducers: {
        updateAppState(state, { payload: appState }: PayloadAction<AppStateStatus>) {
            state.appState = appState;
        },
        updateHasNetAccess(state, { payload: hasNetAccess }: PayloadAction<OrNull<boolean>>) {
            state.hasNetAccess = hasNetAccess;
        },
        updateMemoryUse(state, { payload: memoryUse }: PayloadAction<string>) {
            state.memoryUse = memoryUse;
        },
        updateFocusState(state, { payload: focusState }: PayloadAction<FocusState>) {
            state.focusState = focusState;
        },
    },
});

export const { updateAppState, updateFocusState, updateHasNetAccess, updateMemoryUse } = systemSlice.actions;
export default systemSlice.reducer;

/*
THIS BETTER OFF IN SAGA
enum {
    PERMISSION_1: 'permission_1',
    PERMISSION_2: 'permission_2',
    PERMISSION_3: 'permission_3',
}
const { PERMISSION_1, PERMISSION_2, PERMISSION_3 } = PermissionTypes;

const permissionRequestingFuncs = {
    permission_1: myPermissionRequestingFunction1,
    permission_2: myPermissionRequestingFunction2,
    permission_3: myPermissionRequestingFunction3,
};

function* getPermissions(...permissionTypes: PermissionTypes[]) => {
    try {
        let pCount = permissionTypes.length;

        const [p0, p1, p2]: PermissionTypes[] = pCount
            ? [permissionTypes[0], permissionTypes[1], permissionTypes[2]]
            : [LOCATION, MEDIA_LIBRARY, CAMERA];

        if (p0) {
            let { status, canAskAgain, granted } = yield myPermissionRequestingFunction1[p0]();
            self[p0] = { status, canAskAgain, granted };
        }
        if (p1) {
            let { status, canAskAgain, granted } = yield myPermissionRequestingFunction2[p1]();
            self[p1] = { status, canAskAgain, granted };
        }
        if (p2) {
            let { status, canAskAgain, granted } = yield myPermissionRequestingFunction3[p2]();
            self[p2] = { status, canAskAgain, granted };
        }

        return null;
    } catch (error) {
        console.error(error);
    }
}),
export { Permissions };
 */

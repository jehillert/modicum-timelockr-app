/*
const requestUnlock = (final NokeDevice noke, final String email) => {
        Thread thread = new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    JSONObject jsonObject = new JSONObject();
                    jsonObject.accumulate("session", noke.getSession());
                    jsonObject.accumulate("mac", noke.getMac());
                    jsonObject.accumulate("email", email);

                    String url = serverUrl + "unlock/";
                    mDemoWebClientCallback.onUnlockReceived(POST(url, jsonObject), noke);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });

        thread.start();
    }
  */

export const requestUnlock = () => {

};

const RESOURCE_NAME = window.invokeNative ? GetCurrentResourceName() : "nui_dev"; // Fallback for dev environment

/**
 * Sends a message to the client via fetch API
 * @param {string} eventName - The event name to target
 * @param {object} data - Any data to send along with the event
 * @returns {Promise<any>} - The response from the client
 */

export const fetchNui = async (eventName, data = {}) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(data),
  };

  try {
    const resp = await fetch(`https://${RESOURCE_NAME}/${eventName}`, options);
    return await resp.json();
  } catch (error) {
    // In development, we may not have a NUI environment to respond
    console.error("Error sending NUI message", error);

    // In dev environment, mock a response
    if (!window.invokeNative) {
      console.log("Development environment detected, mocking response");
      return { ok: true };
    }

    return { error };
  }
};

/**
 * Register NUI event listeners
 * @param {function} setVisibility - Function to set UI visibility
 * @param {function} setData - Function to set data from NUI messages
 * @returns {function} - Cleanup function to remove listeners
 */
export const registerNuiListeners = (setVisibility, setData) => {
  const messageListener = (event) => {
    const { data } = event;

    if (data.type === "showui") {
      setVisibility(data.show);
      if (data.data) setData(data.data);
    }

    if (data.type === "hideui") {
      setVisibility(false);
      setData({});
    }
  };

  // Register event listener for NUI messages
  window.addEventListener("message", messageListener);

  // Return cleanup function
  return () => window.removeEventListener("message", messageListener);
};

/**
 * Register ESC key handler
 * @param {function} setVisibility - Function to set UI visibility
 * @returns {function} - Cleanup function to remove listeners
 */
export const registerEscapeHandler = (setVisibility) => {
  const escapeListener = (e) => {
    if (e.key === "Escape") {
      fetchNui("nuicallback", { type: "close" });
      setVisibility(false);
    }
  };

  // Register escape key handler
  window.addEventListener("keydown", escapeListener);

  // Return cleanup function
  return () => window.removeEventListener("keydown", escapeListener);
};

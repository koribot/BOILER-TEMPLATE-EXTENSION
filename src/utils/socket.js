/**
 *  THIS WILL BE NOT INCLUDED IN .production-build
 */
export function connect_to_socket() {
  let socket = new WebSocket("ws://localhost:8080");
  socket.addEventListener("open", (e) => {
    console.log("Connected to WebSocket server");
  });
  socket.addEventListener("message", (event) => {
    if (event.data === "reload") {
      setTimeout(() => {
        chrome.runtime.reload();
      }, 500);
      setTimeout(() => {
        socket.close();
      }, 500);
    }
  });
  socket.addEventListener("close", () => {
    console.log("Disconnected from WebSocket server");
  });
  socket.addEventListener("error", (error) => {
    console.error("WebSocket error, check the server if its on:", error);
  });
}
/**EOF*/

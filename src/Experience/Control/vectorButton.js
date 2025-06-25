export default class VectorButton {
  constructor(parent) {
    this.div = document.createElement("div");
    this.parent = parent;
    this.parent.appendChild(this.div);

    this.isActive = false;

    this.setStyle();
    this.setEvent();
  }

  setStyle() {
    this.div.style.background = "#222222dd";
    this.div.style.margin = "1%";
    this.div.style.height = "80%";
    this.div.style.aspectRatio = "1";
    this.div.style.borderRadius = "8px";
    this.div.style.display = "flex";

    this.icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this.div.appendChild(this.icon);
    this.icon.setAttribute("version", "1.0");
    this.icon.setAttribute("x", "0px");
    this.icon.setAttribute("y", "0px");
    this.icon.setAttribute("viewBox", "0 0 512 512");
    this.icon.setAttribute("xml:space", "preserve");
    this.path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    this.path1.setAttribute(
      "d",
      "M100.97,181.78c-5.67-5.81-8.5-13.99-8.5-24.54,0-8.2,1.81-15.46,5.42-21.76,3.61-6.3,8.77-11.16,15.46-14.58,6.69-3.42,14.48-5.13,23.37-5.13,12.4,0,22.9,2.93,31.5,8.79v59.78c0,1.46-.32,2.49-.95,3.08-.64.59-1.73.88-3.3.88h-8.06c-1.08,0-1.88-.22-2.42-.66-.54-.44-.9-1.15-1.1-2.12l-1.17-5.71c-3.03,3.71-6.77,6.42-11.21,8.13-4.45,1.71-9.84,2.56-16.19,2.56-9.57,0-17.19-2.91-22.86-8.72ZM144.56,172.62c3.96-3.03,5.93-7.03,5.93-12.01v-28.57c-2.05-1.07-4.13-1.83-6.23-2.27-2.1-.44-4.66-.66-7.69-.66-7.72,0-13.92,2.44-18.61,7.33-4.69,4.88-7.03,11.62-7.03,20.22,0,7.03,1.63,12.21,4.91,15.53,3.27,3.32,8.28,4.98,15.02,4.98,5.18,0,9.74-1.51,13.7-4.54Z"
    );
    this.icon.appendChild(this.path1);
    this.path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    this.path2.setAttribute(
      "d",
      "M375.41,445.26c-.68-.54-1.37-1.49-2.05-2.86l-29.45-62.56c-.29-.59-.44-1.17-.44-1.76,0-.68.22-1.24.66-1.68s1.05-.66,1.83-.66h12.16c1.27,0,2.2.22,2.78.66.59.44,1.12,1.24,1.61,2.42l19.63,45.71,19.63-45.71c.49-1.07,1.05-1.86,1.69-2.34.63-.49,1.59-.73,2.86-.73h12.16c.78,0,1.39.22,1.83.66.44.44.66,1,.66,1.68,0,.59-.15,1.17-.44,1.76l-29.45,62.56c-.68,1.37-1.37,2.32-2.05,2.86-.68.54-1.71.8-3.08.8h-7.47c-1.37,0-2.39-.27-3.08-.8Z"
    );
    this.icon.appendChild(this.path2);
    this.path3 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    this.path3.setAttribute(
      "d",
      "M372.87,80.74l-23.27,86.86c-1.71,6.37-9.67,8.51-14.34,3.84l-15.79-15.79-203.26,203.26c-3.24,3.25-8.51,3.25-11.76,0l-19.34-19.34c-3.25-3.25-3.25-8.52,0-11.77l203.26-203.25-16.7-16.7c-4.66-4.66-2.53-12.63,3.85-14.34l86.86-23.27c6.37-1.71,12.2,4.12,10.49,10.5Z"
    );
    this.icon.appendChild(this.path3);
    this.path4 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    this.path4.setAttribute(
      "d",
      "M409.92,233.11l-137.14,137.15,16.69,16.69c4.66,4.66,2.53,12.63-3.84,14.34l-86.87,23.27c-6.37,1.71-12.2-4.12-10.49-10.5l23.27-86.86c1.71-6.37,9.68-8.5,14.34-3.84l15.79,15.79,137.15-137.15c3.25-3.24,8.51-3.24,11.76,0l19.34,19.34c3.25,3.25,3.25,8.52,0,11.77Z"
    );
    this.icon.appendChild(this.path4);
    this.path5 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    this.path5.setAttribute(
      "d",
      "M168.22,100.65h-75.75c-3.37,0-6.1-2.73-6.1-6.1s2.73-6.1,6.1-6.1h61.73l-6.8-7.31c-2.3-2.47-2.16-6.33.31-8.63,2.47-2.29,6.33-2.16,8.63.31l16.34,17.57c1.65,1.78,2.1,4.37,1.13,6.6-.97,2.23-3.17,3.67-5.6,3.67Z"
    );
    this.icon.appendChild(this.path5);
    this.path6 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    this.path6.setAttribute(
      "d",
      "M419.22,359.29h-75.75c-3.37,0-6.1-2.73-6.1-6.1s2.73-6.1,6.1-6.1h61.73l-6.8-7.31c-2.3-2.47-2.16-6.33.31-8.63,2.47-2.29,6.33-2.16,8.63.31l16.34,17.57c1.65,1.78,2.1,4.37,1.13,6.6-.97,2.23-3.17,3.67-5.6,3.67Z"
    );
    this.icon.appendChild(this.path6);

    this.icon.style.height = "86%";
    this.icon.style.aspectRatio = "1";
    this.icon.style.margin = "auto";
    this.icon.style.fill = "#000000dd";
  }

  setEvent() {
    this.div.addEventListener("mouseenter", () => {
      this.div.style.background = "#444444";
    });
    this.div.addEventListener("mouseleave", () => {
      this.div.style.background = "#222222dd";
    });
    this.div.addEventListener("click", () => {
      if (this.isActive) {
        this.icon.style.fill = "#000000dd";
        this.isActive = false;
      } else {
        this.icon.style.fill = "#999999";
        this.isActive = true;
      }
    });
  }
}

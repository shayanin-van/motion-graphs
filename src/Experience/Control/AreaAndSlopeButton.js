export default class AreaAndSlopeButton {
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
      "m445.61,284l-81.55-47.22c-3.27-1.89-7.36.47-7.36,4.24l-.12,94.24c0,3.78,4.08,6.14,7.35,4.26l21.64-12.45,23.64,41.07c1.36,2.36,4.39,3.18,6.75,1.82l29.82-17.17c2.37-1.36,3.18-4.39,1.82-6.75l-23.64-41.07,21.64-12.46c3.27-1.88,3.28-6.6.01-8.5Z"
    );
    this.icon.appendChild(this.path1);
    this.path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    this.path2.setAttribute(
      "d",
      "m470.91,184.5c-52.88-9.83-96.81-29.43-135.57-46.73-35.97-16.05-68.06-30.36-101.8-35.65l74.24-17.96c3.76-.91,6.07-4.69,5.16-8.45s-4.7-6.07-8.45-5.16l-109.36,26.45c-4-5.44-10.45-8.97-17.72-8.97-10.96,0-20.04,8.02-21.71,18.51l-110.15,26.64c-3.76.91-6.07,4.69-5.16,8.45.77,3.2,3.64,5.36,6.8,5.36.54,0,1.1-.06,1.65-.2l77.34-18.71c-14.21,10.17-28.05,23.01-41.32,38.45-27.87,32.41-43.33,64.35-43.98,65.69-1.67,3.48-.2,7.66,3.28,9.34.98.47,2.01.69,3.02.69,2.3,0,4.51-1.14,5.83-3.13l250.03,103.54c2.39.99,5.02-.77,5.02-3.35v-13.49c0-1.47-.88-2.79-2.24-3.35L62.59,221.75c2.77-4.67,6.15-10.11,10.1-16l230.36,95.39c2.39.99,5.02-.77,5.02-3.35v-13.48c0-1.47-.88-2.79-2.24-3.35l-221.37-91.66c3.48-4.56,7.22-9.22,11.22-13.86.35-.41.72-.83,1.08-1.24l206.29,85.43c2.39.99,5.02-.77,5.02-3.35v-13.49c0-1.47-.88-2.79-2.24-3.35l-194.55-80.55c4.85-4.69,10.06-9.33,15.6-13.74l176.18,72.95c2.39.99,5.02-.77,5.02-3.35v-13.48c0-1.47-.88-2.79-2.24-3.35l-159.7-66.14c4.66-2.77,9.48-5.32,14.47-7.56,4.03,4.78,10.06,7.82,16.81,7.82,4,0,7.75-1.07,10.98-2.94l114.67,47.48c2.39.99,5.02-.77,5.02-3.35v-13.49c0-1.47-.88-2.79-2.24-3.35l-102.28-42.35c.91-.02,1.82-.06,2.74-.06,41.29,0,79.32,16.97,123.34,36.61,39.47,17.61,84.21,37.58,138.72,47.71,3.8.7,7.46-1.8,8.16-5.6.71-3.8-1.8-7.45-5.6-8.16Z"
    );
    this.icon.appendChild(this.path2);
    this.path3 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    this.path3.setAttribute(
      "d",
      "m303.05,384.2c2.39.99,5.02-.77,5.02-3.35v-13.48c0-1.47-.88-2.79-2.24-3.35l-253.46-104.98c-2.39-.99-5.02.77-5.02,3.35v13.51c0,1.47.88,2.79,2.24,3.35l253.46,104.95Z"
    );
    this.icon.appendChild(this.path3);
    this.path4 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    this.path4.setAttribute(
      "d",
      "m47.35,317.41c0,1.47.88,2.79,2.24,3.35l253.46,104.96c2.39.99,5.02-.77,5.02-3.35v-13.49c0-1.47-.88-2.79-2.24-3.35l-253.46-104.95c-2.39-.99-5.02.77-5.02,3.35v13.48Z"
    );
    this.icon.appendChild(this.path4);
    this.path5 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    this.path5.setAttribute(
      "d",
      "m47.35,358.95c0,1.47.88,2.79,2.24,3.35l174.93,72.44c.44.18.91.28,1.39.28h32.6c3.97,0,5.06-5.46,1.39-6.98l-207.53-85.94c-2.39-.99-5.02.77-5.02,3.35v13.49Z"
    );
    this.icon.appendChild(this.path5);
    this.path6 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    this.path6.setAttribute(
      "d",
      "m47.35,400.48c0,1.47.88,2.79,2.24,3.35l74.67,30.92c.44.18.91.28,1.39.28h32.55c3.97,0,5.06-5.46,1.39-6.98l-107.22-44.4c-2.39-.99-5.02.77-5.02,3.35v13.48Z"
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

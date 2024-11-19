import { html, fixture, expect } from '@open-wc/testing';
import "../Project-2a.js";

describe("Project2a test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <Project-2a
        title="title"
      ></Project-2a>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

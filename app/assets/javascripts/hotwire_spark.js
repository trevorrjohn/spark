var HotwireSpark = (function () {
  'use strict';

  /*!
  Turbo 8.0.12
  Copyright © 2024 37signals LLC
   */
  /**
   * The MIT License (MIT)
   *
   * Copyright (c) 2019 Javan Makhmali
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */

  (function (prototype) {
    if (typeof prototype.requestSubmit == "function") return

    prototype.requestSubmit = function (submitter) {
      if (submitter) {
        validateSubmitter(submitter, this);
        submitter.click();
      } else {
        submitter = document.createElement("input");
        submitter.type = "submit";
        submitter.hidden = true;
        this.appendChild(submitter);
        submitter.click();
        this.removeChild(submitter);
      }
    };

    function validateSubmitter(submitter, form) {
      submitter instanceof HTMLElement || raise(TypeError, "parameter 1 is not of type 'HTMLElement'");
      submitter.type == "submit" || raise(TypeError, "The specified element is not a submit button");
      submitter.form == form ||
        raise(DOMException, "The specified element is not owned by this form element", "NotFoundError");
    }

    function raise(errorConstructor, message, name) {
      throw new errorConstructor("Failed to execute 'requestSubmit' on 'HTMLFormElement': " + message + ".", name)
    }
  })(HTMLFormElement.prototype);

  const submittersByForm = new WeakMap();

  function findSubmitterFromClickTarget(target) {
    const element = target instanceof Element ? target : target instanceof Node ? target.parentElement : null;
    const candidate = element ? element.closest("input, button") : null;
    return candidate?.type == "submit" ? candidate : null
  }

  function clickCaptured(event) {
    const submitter = findSubmitterFromClickTarget(event.target);

    if (submitter && submitter.form) {
      submittersByForm.set(submitter.form, submitter);
    }
  }

  (function () {
    if ("submitter" in Event.prototype) return

    let prototype = window.Event.prototype;
    // Certain versions of Safari 15 have a bug where they won't
    // populate the submitter. This hurts TurboDrive's enable/disable detection.
    // See https://bugs.webkit.org/show_bug.cgi?id=229660
    if ("SubmitEvent" in window) {
      const prototypeOfSubmitEvent = window.SubmitEvent.prototype;

      if (/Apple Computer/.test(navigator.vendor) && !("submitter" in prototypeOfSubmitEvent)) {
        prototype = prototypeOfSubmitEvent;
      } else {
        return // polyfill not needed
      }
    }

    addEventListener("click", clickCaptured, true);

    Object.defineProperty(prototype, "submitter", {
      get() {
        if (this.type == "submit" && this.target instanceof HTMLFormElement) {
          return submittersByForm.get(this.target)
        }
      }
    });
  })();

  const FrameLoadingStyle = {
    eager: "eager",
    lazy: "lazy"
  };

  /**
   * Contains a fragment of HTML which is updated based on navigation within
   * it (e.g. via links or form submissions).
   *
   * @customElement turbo-frame
   * @example
   *   <turbo-frame id="messages">
   *     <a href="/messages/expanded">
   *       Show all expanded messages in this frame.
   *     </a>
   *
   *     <form action="/messages">
   *       Show response from this form within this frame.
   *     </form>
   *   </turbo-frame>
   */
  class FrameElement extends HTMLElement {
    static delegateConstructor = undefined

    loaded = Promise.resolve()

    static get observedAttributes() {
      return ["disabled", "loading", "src"]
    }

    constructor() {
      super();
      this.delegate = new FrameElement.delegateConstructor(this);
    }

    connectedCallback() {
      this.delegate.connect();
    }

    disconnectedCallback() {
      this.delegate.disconnect();
    }

    reload() {
      return this.delegate.sourceURLReloaded()
    }

    attributeChangedCallback(name) {
      if (name == "loading") {
        this.delegate.loadingStyleChanged();
      } else if (name == "src") {
        this.delegate.sourceURLChanged();
      } else if (name == "disabled") {
        this.delegate.disabledChanged();
      }
    }

    /**
     * Gets the URL to lazily load source HTML from
     */
    get src() {
      return this.getAttribute("src")
    }

    /**
     * Sets the URL to lazily load source HTML from
     */
    set src(value) {
      if (value) {
        this.setAttribute("src", value);
      } else {
        this.removeAttribute("src");
      }
    }

    /**
     * Gets the refresh mode for the frame.
     */
    get refresh() {
      return this.getAttribute("refresh")
    }

    /**
     * Sets the refresh mode for the frame.
     */
    set refresh(value) {
      if (value) {
        this.setAttribute("refresh", value);
      } else {
        this.removeAttribute("refresh");
      }
    }

    get shouldReloadWithMorph() {
      return this.src && this.refresh === "morph"
    }

    /**
     * Determines if the element is loading
     */
    get loading() {
      return frameLoadingStyleFromString(this.getAttribute("loading") || "")
    }

    /**
     * Sets the value of if the element is loading
     */
    set loading(value) {
      if (value) {
        this.setAttribute("loading", value);
      } else {
        this.removeAttribute("loading");
      }
    }

    /**
     * Gets the disabled state of the frame.
     *
     * If disabled, no requests will be intercepted by the frame.
     */
    get disabled() {
      return this.hasAttribute("disabled")
    }

    /**
     * Sets the disabled state of the frame.
     *
     * If disabled, no requests will be intercepted by the frame.
     */
    set disabled(value) {
      if (value) {
        this.setAttribute("disabled", "");
      } else {
        this.removeAttribute("disabled");
      }
    }

    /**
     * Gets the autoscroll state of the frame.
     *
     * If true, the frame will be scrolled into view automatically on update.
     */
    get autoscroll() {
      return this.hasAttribute("autoscroll")
    }

    /**
     * Sets the autoscroll state of the frame.
     *
     * If true, the frame will be scrolled into view automatically on update.
     */
    set autoscroll(value) {
      if (value) {
        this.setAttribute("autoscroll", "");
      } else {
        this.removeAttribute("autoscroll");
      }
    }

    /**
     * Determines if the element has finished loading
     */
    get complete() {
      return !this.delegate.isLoading
    }

    /**
     * Gets the active state of the frame.
     *
     * If inactive, source changes will not be observed.
     */
    get isActive() {
      return this.ownerDocument === document && !this.isPreview
    }

    /**
     * Sets the active state of the frame.
     *
     * If inactive, source changes will not be observed.
     */
    get isPreview() {
      return this.ownerDocument?.documentElement?.hasAttribute("data-turbo-preview")
    }
  }

  function frameLoadingStyleFromString(style) {
    switch (style.toLowerCase()) {
      case "lazy":
        return FrameLoadingStyle.lazy
      default:
        return FrameLoadingStyle.eager
    }
  }

  const drive = {
    enabled: true,
    progressBarDelay: 500,
    unvisitableExtensions: new Set(
      [
        ".7z", ".aac", ".apk", ".avi", ".bmp", ".bz2", ".css", ".csv", ".deb", ".dmg", ".doc",
        ".docx", ".exe", ".gif", ".gz", ".heic", ".heif", ".ico", ".iso", ".jpeg", ".jpg",
        ".js", ".json", ".m4a", ".mkv", ".mov", ".mp3", ".mp4", ".mpeg", ".mpg", ".msi",
        ".ogg", ".ogv", ".pdf", ".pkg", ".png", ".ppt", ".pptx", ".rar", ".rtf",
        ".svg", ".tar", ".tif", ".tiff", ".txt", ".wav", ".webm", ".webp", ".wma", ".wmv",
        ".xls", ".xlsx", ".xml", ".zip"
      ]
    )
  };

  function activateScriptElement(element) {
    if (element.getAttribute("data-turbo-eval") == "false") {
      return element
    } else {
      const createdScriptElement = document.createElement("script");
      const cspNonce = getCspNonce();
      if (cspNonce) {
        createdScriptElement.nonce = cspNonce;
      }
      createdScriptElement.textContent = element.textContent;
      createdScriptElement.async = false;
      copyElementAttributes(createdScriptElement, element);
      return createdScriptElement
    }
  }

  function copyElementAttributes(destinationElement, sourceElement) {
    for (const { name, value } of sourceElement.attributes) {
      destinationElement.setAttribute(name, value);
    }
  }

  function createDocumentFragment(html) {
    const template = document.createElement("template");
    template.innerHTML = html;
    return template.content
  }

  function dispatch(eventName, { target, cancelable, detail } = {}) {
    const event = new CustomEvent(eventName, {
      cancelable,
      bubbles: true,
      composed: true,
      detail
    });

    if (target && target.isConnected) {
      target.dispatchEvent(event);
    } else {
      document.documentElement.dispatchEvent(event);
    }

    return event
  }

  function cancelEvent(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  function nextRepaint() {
    if (document.visibilityState === "hidden") {
      return nextEventLoopTick()
    } else {
      return nextAnimationFrame()
    }
  }

  function nextAnimationFrame() {
    return new Promise((resolve) => requestAnimationFrame(() => resolve()))
  }

  function nextEventLoopTick() {
    return new Promise((resolve) => setTimeout(() => resolve(), 0))
  }

  function nextMicrotask() {
    return Promise.resolve()
  }

  function parseHTMLDocument(html = "") {
    return new DOMParser().parseFromString(html, "text/html")
  }

  function unindent(strings, ...values) {
    const lines = interpolate(strings, values).replace(/^\n/, "").split("\n");
    const match = lines[0].match(/^\s+/);
    const indent = match ? match[0].length : 0;
    return lines.map((line) => line.slice(indent)).join("\n")
  }

  function interpolate(strings, values) {
    return strings.reduce((result, string, i) => {
      const value = values[i] == undefined ? "" : values[i];
      return result + string + value
    }, "")
  }

  function uuid() {
    return Array.from({ length: 36 })
      .map((_, i) => {
        if (i == 8 || i == 13 || i == 18 || i == 23) {
          return "-"
        } else if (i == 14) {
          return "4"
        } else if (i == 19) {
          return (Math.floor(Math.random() * 4) + 8).toString(16)
        } else {
          return Math.floor(Math.random() * 15).toString(16)
        }
      })
      .join("")
  }

  function getAttribute(attributeName, ...elements) {
    for (const value of elements.map((element) => element?.getAttribute(attributeName))) {
      if (typeof value == "string") return value
    }

    return null
  }

  function hasAttribute(attributeName, ...elements) {
    return elements.some((element) => element && element.hasAttribute(attributeName))
  }

  function markAsBusy(...elements) {
    for (const element of elements) {
      if (element.localName == "turbo-frame") {
        element.setAttribute("busy", "");
      }
      element.setAttribute("aria-busy", "true");
    }
  }

  function clearBusyState(...elements) {
    for (const element of elements) {
      if (element.localName == "turbo-frame") {
        element.removeAttribute("busy");
      }

      element.removeAttribute("aria-busy");
    }
  }

  function waitForLoad(element, timeoutInMilliseconds = 2000) {
    return new Promise((resolve) => {
      const onComplete = () => {
        element.removeEventListener("error", onComplete);
        element.removeEventListener("load", onComplete);
        resolve();
      };

      element.addEventListener("load", onComplete, { once: true });
      element.addEventListener("error", onComplete, { once: true });
      setTimeout(resolve, timeoutInMilliseconds);
    })
  }

  function getHistoryMethodForAction(action) {
    switch (action) {
      case "replace":
        return history.replaceState
      case "advance":
      case "restore":
        return history.pushState
    }
  }

  function isAction(action) {
    return action == "advance" || action == "replace" || action == "restore"
  }

  function getVisitAction(...elements) {
    const action = getAttribute("data-turbo-action", ...elements);

    return isAction(action) ? action : null
  }

  function getMetaElement(name) {
    return document.querySelector(`meta[name="${name}"]`)
  }

  function getMetaContent(name) {
    const element = getMetaElement(name);
    return element && element.content
  }

  function getCspNonce() {
    const element = getMetaElement("csp-nonce");

    if (element) {
      const { nonce, content } = element;
      return nonce == "" ? content : nonce
    }
  }

  function setMetaContent(name, content) {
    let element = getMetaElement(name);

    if (!element) {
      element = document.createElement("meta");
      element.setAttribute("name", name);

      document.head.appendChild(element);
    }

    element.setAttribute("content", content);

    return element
  }

  function findClosestRecursively(element, selector) {
    if (element instanceof Element) {
      return (
        element.closest(selector) || findClosestRecursively(element.assignedSlot || element.getRootNode()?.host, selector)
      )
    }
  }

  function elementIsFocusable(element) {
    const inertDisabledOrHidden = "[inert], :disabled, [hidden], details:not([open]), dialog:not([open])";

    return !!element && element.closest(inertDisabledOrHidden) == null && typeof element.focus == "function"
  }

  function queryAutofocusableElement(elementOrDocumentFragment) {
    return Array.from(elementOrDocumentFragment.querySelectorAll("[autofocus]")).find(elementIsFocusable)
  }

  async function around(callback, reader) {
    const before = reader();

    callback();

    await nextAnimationFrame();

    const after = reader();

    return [before, after]
  }

  function doesNotTargetIFrame(name) {
    if (name === "_blank") {
      return false
    } else if (name) {
      for (const element of document.getElementsByName(name)) {
        if (element instanceof HTMLIFrameElement) return false
      }

      return true
    } else {
      return true
    }
  }

  function findLinkFromClickTarget(target) {
    return findClosestRecursively(target, "a[href]:not([target^=_]):not([download])")
  }

  function getLocationForLink(link) {
    return expandURL(link.getAttribute("href") || "")
  }

  function debounce(fn, delay) {
    let timeoutId = null;

    return (...args) => {
      const callback = () => fn.apply(this, args);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(callback, delay);
    }
  }

  const submitter = {
    "aria-disabled": {
      beforeSubmit: submitter => {
        submitter.setAttribute("aria-disabled", "true");
        submitter.addEventListener("click", cancelEvent);
      },

      afterSubmit: submitter => {
        submitter.removeAttribute("aria-disabled");
        submitter.removeEventListener("click", cancelEvent);
      }
    },

    "disabled": {
      beforeSubmit: submitter => submitter.disabled = true,
      afterSubmit: submitter => submitter.disabled = false
    }
  };

  class Config {
    #submitter = null

    constructor(config) {
      Object.assign(this, config);
    }

    get submitter() {
      return this.#submitter
    }

    set submitter(value) {
      this.#submitter = submitter[value] || value;
    }
  }

  const forms = new Config({
    mode: "on",
    submitter: "disabled"
  });

  const config = {
    drive,
    forms
  };

  function expandURL(locatable) {
    return new URL(locatable.toString(), document.baseURI)
  }

  function getAnchor(url) {
    let anchorMatch;
    if (url.hash) {
      return url.hash.slice(1)
      // eslint-disable-next-line no-cond-assign
    } else if ((anchorMatch = url.href.match(/#(.*)$/))) {
      return anchorMatch[1]
    }
  }

  function getAction$1(form, submitter) {
    const action = submitter?.getAttribute("formaction") || form.getAttribute("action") || form.action;

    return expandURL(action)
  }

  function getExtension(url) {
    return (getLastPathComponent(url).match(/\.[^.]*$/) || [])[0] || ""
  }

  function isPrefixedBy(baseURL, url) {
    const prefix = getPrefix(url);
    return baseURL.href === expandURL(prefix).href || baseURL.href.startsWith(prefix)
  }

  function locationIsVisitable(location, rootLocation) {
    return isPrefixedBy(location, rootLocation) && !config.drive.unvisitableExtensions.has(getExtension(location))
  }

  function getRequestURL(url) {
    const anchor = getAnchor(url);
    return anchor != null ? url.href.slice(0, -(anchor.length + 1)) : url.href
  }

  function toCacheKey(url) {
    return getRequestURL(url)
  }

  function urlsAreEqual(left, right) {
    return expandURL(left).href == expandURL(right).href
  }

  function getPathComponents(url) {
    return url.pathname.split("/").slice(1)
  }

  function getLastPathComponent(url) {
    return getPathComponents(url).slice(-1)[0]
  }

  function getPrefix(url) {
    return addTrailingSlash(url.origin + url.pathname)
  }

  function addTrailingSlash(value) {
    return value.endsWith("/") ? value : value + "/"
  }

  class FetchResponse {
    constructor(response) {
      this.response = response;
    }

    get succeeded() {
      return this.response.ok
    }

    get failed() {
      return !this.succeeded
    }

    get clientError() {
      return this.statusCode >= 400 && this.statusCode <= 499
    }

    get serverError() {
      return this.statusCode >= 500 && this.statusCode <= 599
    }

    get redirected() {
      return this.response.redirected
    }

    get location() {
      return expandURL(this.response.url)
    }

    get isHTML() {
      return this.contentType && this.contentType.match(/^(?:text\/([^\s;,]+\b)?html|application\/xhtml\+xml)\b/)
    }

    get statusCode() {
      return this.response.status
    }

    get contentType() {
      return this.header("Content-Type")
    }

    get responseText() {
      return this.response.clone().text()
    }

    get responseHTML() {
      if (this.isHTML) {
        return this.response.clone().text()
      } else {
        return Promise.resolve(undefined)
      }
    }

    header(name) {
      return this.response.headers.get(name)
    }
  }

  class LimitedSet extends Set {
    constructor(maxSize) {
      super();
      this.maxSize = maxSize;
    }

    add(value) {
      if (this.size >= this.maxSize) {
        const iterator = this.values();
        const oldestValue = iterator.next().value;
        this.delete(oldestValue);
      }
      super.add(value);
    }
  }

  const recentRequests = new LimitedSet(20);

  const nativeFetch = window.fetch;

  function fetchWithTurboHeaders(url, options = {}) {
    const modifiedHeaders = new Headers(options.headers || {});
    const requestUID = uuid();
    recentRequests.add(requestUID);
    modifiedHeaders.append("X-Turbo-Request-Id", requestUID);

    return nativeFetch(url, {
      ...options,
      headers: modifiedHeaders
    })
  }

  function fetchMethodFromString(method) {
    switch (method.toLowerCase()) {
      case "get":
        return FetchMethod.get
      case "post":
        return FetchMethod.post
      case "put":
        return FetchMethod.put
      case "patch":
        return FetchMethod.patch
      case "delete":
        return FetchMethod.delete
    }
  }

  const FetchMethod = {
    get: "get",
    post: "post",
    put: "put",
    patch: "patch",
    delete: "delete"
  };

  function fetchEnctypeFromString(encoding) {
    switch (encoding.toLowerCase()) {
      case FetchEnctype.multipart:
        return FetchEnctype.multipart
      case FetchEnctype.plain:
        return FetchEnctype.plain
      default:
        return FetchEnctype.urlEncoded
    }
  }

  const FetchEnctype = {
    urlEncoded: "application/x-www-form-urlencoded",
    multipart: "multipart/form-data",
    plain: "text/plain"
  };

  class FetchRequest {
    abortController = new AbortController()
    #resolveRequestPromise = (_value) => {}

    constructor(delegate, method, location, requestBody = new URLSearchParams(), target = null, enctype = FetchEnctype.urlEncoded) {
      const [url, body] = buildResourceAndBody(expandURL(location), method, requestBody, enctype);

      this.delegate = delegate;
      this.url = url;
      this.target = target;
      this.fetchOptions = {
        credentials: "same-origin",
        redirect: "follow",
        method: method.toUpperCase(),
        headers: { ...this.defaultHeaders },
        body: body,
        signal: this.abortSignal,
        referrer: this.delegate.referrer?.href
      };
      this.enctype = enctype;
    }

    get method() {
      return this.fetchOptions.method
    }

    set method(value) {
      const fetchBody = this.isSafe ? this.url.searchParams : this.fetchOptions.body || new FormData();
      const fetchMethod = fetchMethodFromString(value) || FetchMethod.get;

      this.url.search = "";

      const [url, body] = buildResourceAndBody(this.url, fetchMethod, fetchBody, this.enctype);

      this.url = url;
      this.fetchOptions.body = body;
      this.fetchOptions.method = fetchMethod.toUpperCase();
    }

    get headers() {
      return this.fetchOptions.headers
    }

    set headers(value) {
      this.fetchOptions.headers = value;
    }

    get body() {
      if (this.isSafe) {
        return this.url.searchParams
      } else {
        return this.fetchOptions.body
      }
    }

    set body(value) {
      this.fetchOptions.body = value;
    }

    get location() {
      return this.url
    }

    get params() {
      return this.url.searchParams
    }

    get entries() {
      return this.body ? Array.from(this.body.entries()) : []
    }

    cancel() {
      this.abortController.abort();
    }

    async perform() {
      const { fetchOptions } = this;
      this.delegate.prepareRequest(this);
      const event = await this.#allowRequestToBeIntercepted(fetchOptions);
      try {
        this.delegate.requestStarted(this);

        if (event.detail.fetchRequest) {
          this.response = event.detail.fetchRequest.response;
        } else {
          this.response = fetchWithTurboHeaders(this.url.href, fetchOptions);
        }

        const response = await this.response;
        return await this.receive(response)
      } catch (error) {
        if (error.name !== "AbortError") {
          if (this.#willDelegateErrorHandling(error)) {
            this.delegate.requestErrored(this, error);
          }
          throw error
        }
      } finally {
        this.delegate.requestFinished(this);
      }
    }

    async receive(response) {
      const fetchResponse = new FetchResponse(response);
      const event = dispatch("turbo:before-fetch-response", {
        cancelable: true,
        detail: { fetchResponse },
        target: this.target
      });
      if (event.defaultPrevented) {
        this.delegate.requestPreventedHandlingResponse(this, fetchResponse);
      } else if (fetchResponse.succeeded) {
        this.delegate.requestSucceededWithResponse(this, fetchResponse);
      } else {
        this.delegate.requestFailedWithResponse(this, fetchResponse);
      }
      return fetchResponse
    }

    get defaultHeaders() {
      return {
        Accept: "text/html, application/xhtml+xml"
      }
    }

    get isSafe() {
      return isSafe(this.method)
    }

    get abortSignal() {
      return this.abortController.signal
    }

    acceptResponseType(mimeType) {
      this.headers["Accept"] = [mimeType, this.headers["Accept"]].join(", ");
    }

    async #allowRequestToBeIntercepted(fetchOptions) {
      const requestInterception = new Promise((resolve) => (this.#resolveRequestPromise = resolve));
      const event = dispatch("turbo:before-fetch-request", {
        cancelable: true,
        detail: {
          fetchOptions,
          url: this.url,
          resume: this.#resolveRequestPromise
        },
        target: this.target
      });
      this.url = event.detail.url;
      if (event.defaultPrevented) await requestInterception;

      return event
    }

    #willDelegateErrorHandling(error) {
      const event = dispatch("turbo:fetch-request-error", {
        target: this.target,
        cancelable: true,
        detail: { request: this, error: error }
      });

      return !event.defaultPrevented
    }
  }

  function isSafe(fetchMethod) {
    return fetchMethodFromString(fetchMethod) == FetchMethod.get
  }

  function buildResourceAndBody(resource, method, requestBody, enctype) {
    const searchParams =
      Array.from(requestBody).length > 0 ? new URLSearchParams(entriesExcludingFiles(requestBody)) : resource.searchParams;

    if (isSafe(method)) {
      return [mergeIntoURLSearchParams(resource, searchParams), null]
    } else if (enctype == FetchEnctype.urlEncoded) {
      return [resource, searchParams]
    } else {
      return [resource, requestBody]
    }
  }

  function entriesExcludingFiles(requestBody) {
    const entries = [];

    for (const [name, value] of requestBody) {
      if (value instanceof File) continue
      else entries.push([name, value]);
    }

    return entries
  }

  function mergeIntoURLSearchParams(url, requestBody) {
    const searchParams = new URLSearchParams(entriesExcludingFiles(requestBody));

    url.search = searchParams.toString();

    return url
  }

  class AppearanceObserver {
    started = false

    constructor(delegate, element) {
      this.delegate = delegate;
      this.element = element;
      this.intersectionObserver = new IntersectionObserver(this.intersect);
    }

    start() {
      if (!this.started) {
        this.started = true;
        this.intersectionObserver.observe(this.element);
      }
    }

    stop() {
      if (this.started) {
        this.started = false;
        this.intersectionObserver.unobserve(this.element);
      }
    }

    intersect = (entries) => {
      const lastEntry = entries.slice(-1)[0];
      if (lastEntry?.isIntersecting) {
        this.delegate.elementAppearedInViewport(this.element);
      }
    }
  }

  class StreamMessage {
    static contentType = "text/vnd.turbo-stream.html"

    static wrap(message) {
      if (typeof message == "string") {
        return new this(createDocumentFragment(message))
      } else {
        return message
      }
    }

    constructor(fragment) {
      this.fragment = importStreamElements(fragment);
    }
  }

  function importStreamElements(fragment) {
    for (const element of fragment.querySelectorAll("turbo-stream")) {
      const streamElement = document.importNode(element, true);

      for (const inertScriptElement of streamElement.templateElement.content.querySelectorAll("script")) {
        inertScriptElement.replaceWith(activateScriptElement(inertScriptElement));
      }

      element.replaceWith(streamElement);
    }

    return fragment
  }

  const PREFETCH_DELAY = 100;

  class PrefetchCache {
    #prefetchTimeout = null
    #prefetched = null

    get(url) {
      if (this.#prefetched && this.#prefetched.url === url && this.#prefetched.expire > Date.now()) {
        return this.#prefetched.request
      }
    }

    setLater(url, request, ttl) {
      this.clear();

      this.#prefetchTimeout = setTimeout(() => {
        request.perform();
        this.set(url, request, ttl);
        this.#prefetchTimeout = null;
      }, PREFETCH_DELAY);
    }

    set(url, request, ttl) {
      this.#prefetched = { url, request, expire: new Date(new Date().getTime() + ttl) };
    }

    clear() {
      if (this.#prefetchTimeout) clearTimeout(this.#prefetchTimeout);
      this.#prefetched = null;
    }
  }

  const cacheTtl = 10 * 1000;
  const prefetchCache = new PrefetchCache();

  const FormSubmissionState = {
    initialized: "initialized",
    requesting: "requesting",
    waiting: "waiting",
    receiving: "receiving",
    stopping: "stopping",
    stopped: "stopped"
  };

  class FormSubmission {
    state = FormSubmissionState.initialized

    static confirmMethod(message) {
      return Promise.resolve(confirm(message))
    }

    constructor(delegate, formElement, submitter, mustRedirect = false) {
      const method = getMethod(formElement, submitter);
      const action = getAction(getFormAction(formElement, submitter), method);
      const body = buildFormData(formElement, submitter);
      const enctype = getEnctype(formElement, submitter);

      this.delegate = delegate;
      this.formElement = formElement;
      this.submitter = submitter;
      this.fetchRequest = new FetchRequest(this, method, action, body, formElement, enctype);
      this.mustRedirect = mustRedirect;
    }

    get method() {
      return this.fetchRequest.method
    }

    set method(value) {
      this.fetchRequest.method = value;
    }

    get action() {
      return this.fetchRequest.url.toString()
    }

    set action(value) {
      this.fetchRequest.url = expandURL(value);
    }

    get body() {
      return this.fetchRequest.body
    }

    get enctype() {
      return this.fetchRequest.enctype
    }

    get isSafe() {
      return this.fetchRequest.isSafe
    }

    get location() {
      return this.fetchRequest.url
    }

    // The submission process

    async start() {
      const { initialized, requesting } = FormSubmissionState;
      const confirmationMessage = getAttribute("data-turbo-confirm", this.submitter, this.formElement);

      if (typeof confirmationMessage === "string") {
        const confirmMethod = typeof config.forms.confirm === "function" ?
          config.forms.confirm :
          FormSubmission.confirmMethod;

        const answer = await confirmMethod(confirmationMessage, this.formElement, this.submitter);
        if (!answer) {
          return
        }
      }

      if (this.state == initialized) {
        this.state = requesting;
        return this.fetchRequest.perform()
      }
    }

    stop() {
      const { stopping, stopped } = FormSubmissionState;
      if (this.state != stopping && this.state != stopped) {
        this.state = stopping;
        this.fetchRequest.cancel();
        return true
      }
    }

    // Fetch request delegate

    prepareRequest(request) {
      if (!request.isSafe) {
        const token = getCookieValue(getMetaContent("csrf-param")) || getMetaContent("csrf-token");
        if (token) {
          request.headers["X-CSRF-Token"] = token;
        }
      }

      if (this.requestAcceptsTurboStreamResponse(request)) {
        request.acceptResponseType(StreamMessage.contentType);
      }
    }

    requestStarted(_request) {
      this.state = FormSubmissionState.waiting;
      if (this.submitter) config.forms.submitter.beforeSubmit(this.submitter);
      this.setSubmitsWith();
      markAsBusy(this.formElement);
      dispatch("turbo:submit-start", {
        target: this.formElement,
        detail: { formSubmission: this }
      });
      this.delegate.formSubmissionStarted(this);
    }

    requestPreventedHandlingResponse(request, response) {
      prefetchCache.clear();

      this.result = { success: response.succeeded, fetchResponse: response };
    }

    requestSucceededWithResponse(request, response) {
      if (response.clientError || response.serverError) {
        this.delegate.formSubmissionFailedWithResponse(this, response);
        return
      }

      prefetchCache.clear();

      if (this.requestMustRedirect(request) && responseSucceededWithoutRedirect(response)) {
        const error = new Error("Form responses must redirect to another location");
        this.delegate.formSubmissionErrored(this, error);
      } else {
        this.state = FormSubmissionState.receiving;
        this.result = { success: true, fetchResponse: response };
        this.delegate.formSubmissionSucceededWithResponse(this, response);
      }
    }

    requestFailedWithResponse(request, response) {
      this.result = { success: false, fetchResponse: response };
      this.delegate.formSubmissionFailedWithResponse(this, response);
    }

    requestErrored(request, error) {
      this.result = { success: false, error };
      this.delegate.formSubmissionErrored(this, error);
    }

    requestFinished(_request) {
      this.state = FormSubmissionState.stopped;
      if (this.submitter) config.forms.submitter.afterSubmit(this.submitter);
      this.resetSubmitterText();
      clearBusyState(this.formElement);
      dispatch("turbo:submit-end", {
        target: this.formElement,
        detail: { formSubmission: this, ...this.result }
      });
      this.delegate.formSubmissionFinished(this);
    }

    // Private

    setSubmitsWith() {
      if (!this.submitter || !this.submitsWith) return

      if (this.submitter.matches("button")) {
        this.originalSubmitText = this.submitter.innerHTML;
        this.submitter.innerHTML = this.submitsWith;
      } else if (this.submitter.matches("input")) {
        const input = this.submitter;
        this.originalSubmitText = input.value;
        input.value = this.submitsWith;
      }
    }

    resetSubmitterText() {
      if (!this.submitter || !this.originalSubmitText) return

      if (this.submitter.matches("button")) {
        this.submitter.innerHTML = this.originalSubmitText;
      } else if (this.submitter.matches("input")) {
        const input = this.submitter;
        input.value = this.originalSubmitText;
      }
    }

    requestMustRedirect(request) {
      return !request.isSafe && this.mustRedirect
    }

    requestAcceptsTurboStreamResponse(request) {
      return !request.isSafe || hasAttribute("data-turbo-stream", this.submitter, this.formElement)
    }

    get submitsWith() {
      return this.submitter?.getAttribute("data-turbo-submits-with")
    }
  }

  function buildFormData(formElement, submitter) {
    const formData = new FormData(formElement);
    const name = submitter?.getAttribute("name");
    const value = submitter?.getAttribute("value");

    if (name) {
      formData.append(name, value || "");
    }

    return formData
  }

  function getCookieValue(cookieName) {
    if (cookieName != null) {
      const cookies = document.cookie ? document.cookie.split("; ") : [];
      const cookie = cookies.find((cookie) => cookie.startsWith(cookieName));
      if (cookie) {
        const value = cookie.split("=").slice(1).join("=");
        return value ? decodeURIComponent(value) : undefined
      }
    }
  }

  function responseSucceededWithoutRedirect(response) {
    return response.statusCode == 200 && !response.redirected
  }

  function getFormAction(formElement, submitter) {
    const formElementAction = typeof formElement.action === "string" ? formElement.action : null;

    if (submitter?.hasAttribute("formaction")) {
      return submitter.getAttribute("formaction") || ""
    } else {
      return formElement.getAttribute("action") || formElementAction || ""
    }
  }

  function getAction(formAction, fetchMethod) {
    const action = expandURL(formAction);

    if (isSafe(fetchMethod)) {
      action.search = "";
    }

    return action
  }

  function getMethod(formElement, submitter) {
    const method = submitter?.getAttribute("formmethod") || formElement.getAttribute("method") || "";
    return fetchMethodFromString(method.toLowerCase()) || FetchMethod.get
  }

  function getEnctype(formElement, submitter) {
    return fetchEnctypeFromString(submitter?.getAttribute("formenctype") || formElement.enctype)
  }

  class Snapshot {
    constructor(element) {
      this.element = element;
    }

    get activeElement() {
      return this.element.ownerDocument.activeElement
    }

    get children() {
      return [...this.element.children]
    }

    hasAnchor(anchor) {
      return this.getElementForAnchor(anchor) != null
    }

    getElementForAnchor(anchor) {
      return anchor ? this.element.querySelector(`[id='${anchor}'], a[name='${anchor}']`) : null
    }

    get isConnected() {
      return this.element.isConnected
    }

    get firstAutofocusableElement() {
      return queryAutofocusableElement(this.element)
    }

    get permanentElements() {
      return queryPermanentElementsAll(this.element)
    }

    getPermanentElementById(id) {
      return getPermanentElementById(this.element, id)
    }

    getPermanentElementMapForSnapshot(snapshot) {
      const permanentElementMap = {};

      for (const currentPermanentElement of this.permanentElements) {
        const { id } = currentPermanentElement;
        const newPermanentElement = snapshot.getPermanentElementById(id);
        if (newPermanentElement) {
          permanentElementMap[id] = [currentPermanentElement, newPermanentElement];
        }
      }

      return permanentElementMap
    }
  }

  function getPermanentElementById(node, id) {
    return node.querySelector(`#${id}[data-turbo-permanent]`)
  }

  function queryPermanentElementsAll(node) {
    return node.querySelectorAll("[id][data-turbo-permanent]")
  }

  class FormSubmitObserver {
    started = false

    constructor(delegate, eventTarget) {
      this.delegate = delegate;
      this.eventTarget = eventTarget;
    }

    start() {
      if (!this.started) {
        this.eventTarget.addEventListener("submit", this.submitCaptured, true);
        this.started = true;
      }
    }

    stop() {
      if (this.started) {
        this.eventTarget.removeEventListener("submit", this.submitCaptured, true);
        this.started = false;
      }
    }

    submitCaptured = () => {
      this.eventTarget.removeEventListener("submit", this.submitBubbled, false);
      this.eventTarget.addEventListener("submit", this.submitBubbled, false);
    }

    submitBubbled = (event) => {
      if (!event.defaultPrevented) {
        const form = event.target instanceof HTMLFormElement ? event.target : undefined;
        const submitter = event.submitter || undefined;

        if (
          form &&
          submissionDoesNotDismissDialog(form, submitter) &&
          submissionDoesNotTargetIFrame(form, submitter) &&
          this.delegate.willSubmitForm(form, submitter)
        ) {
          event.preventDefault();
          event.stopImmediatePropagation();
          this.delegate.formSubmitted(form, submitter);
        }
      }
    }
  }

  function submissionDoesNotDismissDialog(form, submitter) {
    const method = submitter?.getAttribute("formmethod") || form.getAttribute("method");

    return method != "dialog"
  }

  function submissionDoesNotTargetIFrame(form, submitter) {
    const target = submitter?.getAttribute("formtarget") || form.getAttribute("target");

    return doesNotTargetIFrame(target)
  }

  class View {
    #resolveRenderPromise = (_value) => {}
    #resolveInterceptionPromise = (_value) => {}

    constructor(delegate, element) {
      this.delegate = delegate;
      this.element = element;
    }

    // Scrolling

    scrollToAnchor(anchor) {
      const element = this.snapshot.getElementForAnchor(anchor);
      if (element) {
        this.scrollToElement(element);
        this.focusElement(element);
      } else {
        this.scrollToPosition({ x: 0, y: 0 });
      }
    }

    scrollToAnchorFromLocation(location) {
      this.scrollToAnchor(getAnchor(location));
    }

    scrollToElement(element) {
      element.scrollIntoView();
    }

    focusElement(element) {
      if (element instanceof HTMLElement) {
        if (element.hasAttribute("tabindex")) {
          element.focus();
        } else {
          element.setAttribute("tabindex", "-1");
          element.focus();
          element.removeAttribute("tabindex");
        }
      }
    }

    scrollToPosition({ x, y }) {
      this.scrollRoot.scrollTo(x, y);
    }

    scrollToTop() {
      this.scrollToPosition({ x: 0, y: 0 });
    }

    get scrollRoot() {
      return window
    }

    // Rendering

    async render(renderer) {
      const { isPreview, shouldRender, willRender, newSnapshot: snapshot } = renderer;

      // A workaround to ignore tracked element mismatch reloads when performing
      // a promoted Visit from a frame navigation
      const shouldInvalidate = willRender;

      if (shouldRender) {
        try {
          this.renderPromise = new Promise((resolve) => (this.#resolveRenderPromise = resolve));
          this.renderer = renderer;
          await this.prepareToRenderSnapshot(renderer);

          const renderInterception = new Promise((resolve) => (this.#resolveInterceptionPromise = resolve));
          const options = { resume: this.#resolveInterceptionPromise, render: this.renderer.renderElement, renderMethod: this.renderer.renderMethod };
          const immediateRender = this.delegate.allowsImmediateRender(snapshot, options);
          if (!immediateRender) await renderInterception;

          await this.renderSnapshot(renderer);
          this.delegate.viewRenderedSnapshot(snapshot, isPreview, this.renderer.renderMethod);
          this.delegate.preloadOnLoadLinksForView(this.element);
          this.finishRenderingSnapshot(renderer);
        } finally {
          delete this.renderer;
          this.#resolveRenderPromise(undefined);
          delete this.renderPromise;
        }
      } else if (shouldInvalidate) {
        this.invalidate(renderer.reloadReason);
      }
    }

    invalidate(reason) {
      this.delegate.viewInvalidated(reason);
    }

    async prepareToRenderSnapshot(renderer) {
      this.markAsPreview(renderer.isPreview);
      await renderer.prepareToRender();
    }

    markAsPreview(isPreview) {
      if (isPreview) {
        this.element.setAttribute("data-turbo-preview", "");
      } else {
        this.element.removeAttribute("data-turbo-preview");
      }
    }

    markVisitDirection(direction) {
      this.element.setAttribute("data-turbo-visit-direction", direction);
    }

    unmarkVisitDirection() {
      this.element.removeAttribute("data-turbo-visit-direction");
    }

    async renderSnapshot(renderer) {
      await renderer.render();
    }

    finishRenderingSnapshot(renderer) {
      renderer.finishRendering();
    }
  }

  class FrameView extends View {
    missing() {
      this.element.innerHTML = `<strong class="turbo-frame-error">Content missing</strong>`;
    }

    get snapshot() {
      return new Snapshot(this.element)
    }
  }

  class LinkInterceptor {
    constructor(delegate, element) {
      this.delegate = delegate;
      this.element = element;
    }

    start() {
      this.element.addEventListener("click", this.clickBubbled);
      document.addEventListener("turbo:click", this.linkClicked);
      document.addEventListener("turbo:before-visit", this.willVisit);
    }

    stop() {
      this.element.removeEventListener("click", this.clickBubbled);
      document.removeEventListener("turbo:click", this.linkClicked);
      document.removeEventListener("turbo:before-visit", this.willVisit);
    }

    clickBubbled = (event) => {
      if (this.clickEventIsSignificant(event)) {
        this.clickEvent = event;
      } else {
        delete this.clickEvent;
      }
    }

    linkClicked = (event) => {
      if (this.clickEvent && this.clickEventIsSignificant(event)) {
        if (this.delegate.shouldInterceptLinkClick(event.target, event.detail.url, event.detail.originalEvent)) {
          this.clickEvent.preventDefault();
          event.preventDefault();
          this.delegate.linkClickIntercepted(event.target, event.detail.url, event.detail.originalEvent);
        }
      }
      delete this.clickEvent;
    }

    willVisit = (_event) => {
      delete this.clickEvent;
    }

    clickEventIsSignificant(event) {
      const target = event.composed ? event.target?.parentElement : event.target;
      const element = findLinkFromClickTarget(target) || target;

      return element instanceof Element && element.closest("turbo-frame, html") == this.element
    }
  }

  class LinkClickObserver {
    started = false

    constructor(delegate, eventTarget) {
      this.delegate = delegate;
      this.eventTarget = eventTarget;
    }

    start() {
      if (!this.started) {
        this.eventTarget.addEventListener("click", this.clickCaptured, true);
        this.started = true;
      }
    }

    stop() {
      if (this.started) {
        this.eventTarget.removeEventListener("click", this.clickCaptured, true);
        this.started = false;
      }
    }

    clickCaptured = () => {
      this.eventTarget.removeEventListener("click", this.clickBubbled, false);
      this.eventTarget.addEventListener("click", this.clickBubbled, false);
    }

    clickBubbled = (event) => {
      if (event instanceof MouseEvent && this.clickEventIsSignificant(event)) {
        const target = (event.composedPath && event.composedPath()[0]) || event.target;
        const link = findLinkFromClickTarget(target);
        if (link && doesNotTargetIFrame(link.target)) {
          const location = getLocationForLink(link);
          if (this.delegate.willFollowLinkToLocation(link, location, event)) {
            event.preventDefault();
            this.delegate.followedLinkToLocation(link, location);
          }
        }
      }
    }

    clickEventIsSignificant(event) {
      return !(
        (event.target && event.target.isContentEditable) ||
        event.defaultPrevented ||
        event.which > 1 ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey
      )
    }
  }

  class FormLinkClickObserver {
    constructor(delegate, element) {
      this.delegate = delegate;
      this.linkInterceptor = new LinkClickObserver(this, element);
    }

    start() {
      this.linkInterceptor.start();
    }

    stop() {
      this.linkInterceptor.stop();
    }

    // Link hover observer delegate

    canPrefetchRequestToLocation(link, location) {
      return false
    }

    prefetchAndCacheRequestToLocation(link, location) {
      return
    }

    // Link click observer delegate

    willFollowLinkToLocation(link, location, originalEvent) {
      return (
        this.delegate.willSubmitFormLinkToLocation(link, location, originalEvent) &&
        (link.hasAttribute("data-turbo-method") || link.hasAttribute("data-turbo-stream"))
      )
    }

    followedLinkToLocation(link, location) {
      const form = document.createElement("form");

      const type = "hidden";
      for (const [name, value] of location.searchParams) {
        form.append(Object.assign(document.createElement("input"), { type, name, value }));
      }

      const action = Object.assign(location, { search: "" });
      form.setAttribute("data-turbo", "true");
      form.setAttribute("action", action.href);
      form.setAttribute("hidden", "");

      const method = link.getAttribute("data-turbo-method");
      if (method) form.setAttribute("method", method);

      const turboFrame = link.getAttribute("data-turbo-frame");
      if (turboFrame) form.setAttribute("data-turbo-frame", turboFrame);

      const turboAction = getVisitAction(link);
      if (turboAction) form.setAttribute("data-turbo-action", turboAction);

      const turboConfirm = link.getAttribute("data-turbo-confirm");
      if (turboConfirm) form.setAttribute("data-turbo-confirm", turboConfirm);

      const turboStream = link.hasAttribute("data-turbo-stream");
      if (turboStream) form.setAttribute("data-turbo-stream", "");

      this.delegate.submittedFormLinkToLocation(link, location, form);

      document.body.appendChild(form);
      form.addEventListener("turbo:submit-end", () => form.remove(), { once: true });
      requestAnimationFrame(() => form.requestSubmit());
    }
  }

  class Bardo {
    static async preservingPermanentElements(delegate, permanentElementMap, callback) {
      const bardo = new this(delegate, permanentElementMap);
      bardo.enter();
      await callback();
      bardo.leave();
    }

    constructor(delegate, permanentElementMap) {
      this.delegate = delegate;
      this.permanentElementMap = permanentElementMap;
    }

    enter() {
      for (const id in this.permanentElementMap) {
        const [currentPermanentElement, newPermanentElement] = this.permanentElementMap[id];
        this.delegate.enteringBardo(currentPermanentElement, newPermanentElement);
        this.replaceNewPermanentElementWithPlaceholder(newPermanentElement);
      }
    }

    leave() {
      for (const id in this.permanentElementMap) {
        const [currentPermanentElement] = this.permanentElementMap[id];
        this.replaceCurrentPermanentElementWithClone(currentPermanentElement);
        this.replacePlaceholderWithPermanentElement(currentPermanentElement);
        this.delegate.leavingBardo(currentPermanentElement);
      }
    }

    replaceNewPermanentElementWithPlaceholder(permanentElement) {
      const placeholder = createPlaceholderForPermanentElement(permanentElement);
      permanentElement.replaceWith(placeholder);
    }

    replaceCurrentPermanentElementWithClone(permanentElement) {
      const clone = permanentElement.cloneNode(true);
      permanentElement.replaceWith(clone);
    }

    replacePlaceholderWithPermanentElement(permanentElement) {
      const placeholder = this.getPlaceholderById(permanentElement.id);
      placeholder?.replaceWith(permanentElement);
    }

    getPlaceholderById(id) {
      return this.placeholders.find((element) => element.content == id)
    }

    get placeholders() {
      return [...document.querySelectorAll("meta[name=turbo-permanent-placeholder][content]")]
    }
  }

  function createPlaceholderForPermanentElement(permanentElement) {
    const element = document.createElement("meta");
    element.setAttribute("name", "turbo-permanent-placeholder");
    element.setAttribute("content", permanentElement.id);
    return element
  }

  class Renderer {
    #activeElement = null

    static renderElement(currentElement, newElement) {
      // Abstract method
    }

    constructor(currentSnapshot, newSnapshot, isPreview, willRender = true) {
      this.currentSnapshot = currentSnapshot;
      this.newSnapshot = newSnapshot;
      this.isPreview = isPreview;
      this.willRender = willRender;
      this.renderElement = this.constructor.renderElement;
      this.promise = new Promise((resolve, reject) => (this.resolvingFunctions = { resolve, reject }));
    }

    get shouldRender() {
      return true
    }

    get shouldAutofocus() {
      return true
    }

    get reloadReason() {
      return
    }

    prepareToRender() {
      return
    }

    render() {
      // Abstract method
    }

    finishRendering() {
      if (this.resolvingFunctions) {
        this.resolvingFunctions.resolve();
        delete this.resolvingFunctions;
      }
    }

    async preservingPermanentElements(callback) {
      await Bardo.preservingPermanentElements(this, this.permanentElementMap, callback);
    }

    focusFirstAutofocusableElement() {
      if (this.shouldAutofocus) {
        const element = this.connectedSnapshot.firstAutofocusableElement;
        if (element) {
          element.focus();
        }
      }
    }

    // Bardo delegate

    enteringBardo(currentPermanentElement) {
      if (this.#activeElement) return

      if (currentPermanentElement.contains(this.currentSnapshot.activeElement)) {
        this.#activeElement = this.currentSnapshot.activeElement;
      }
    }

    leavingBardo(currentPermanentElement) {
      if (currentPermanentElement.contains(this.#activeElement) && this.#activeElement instanceof HTMLElement) {
        this.#activeElement.focus();

        this.#activeElement = null;
      }
    }

    get connectedSnapshot() {
      return this.newSnapshot.isConnected ? this.newSnapshot : this.currentSnapshot
    }

    get currentElement() {
      return this.currentSnapshot.element
    }

    get newElement() {
      return this.newSnapshot.element
    }

    get permanentElementMap() {
      return this.currentSnapshot.getPermanentElementMapForSnapshot(this.newSnapshot)
    }

    get renderMethod() {
      return "replace"
    }
  }

  class FrameRenderer extends Renderer {
    static renderElement(currentElement, newElement) {
      const destinationRange = document.createRange();
      destinationRange.selectNodeContents(currentElement);
      destinationRange.deleteContents();

      const frameElement = newElement;
      const sourceRange = frameElement.ownerDocument?.createRange();
      if (sourceRange) {
        sourceRange.selectNodeContents(frameElement);
        currentElement.appendChild(sourceRange.extractContents());
      }
    }

    constructor(delegate, currentSnapshot, newSnapshot, renderElement, isPreview, willRender = true) {
      super(currentSnapshot, newSnapshot, renderElement, isPreview, willRender);
      this.delegate = delegate;
    }

    get shouldRender() {
      return true
    }

    async render() {
      await nextRepaint();
      this.preservingPermanentElements(() => {
        this.loadFrameElement();
      });
      this.scrollFrameIntoView();
      await nextRepaint();
      this.focusFirstAutofocusableElement();
      await nextRepaint();
      this.activateScriptElements();
    }

    loadFrameElement() {
      this.delegate.willRenderFrame(this.currentElement, this.newElement);
      this.renderElement(this.currentElement, this.newElement);
    }

    scrollFrameIntoView() {
      if (this.currentElement.autoscroll || this.newElement.autoscroll) {
        const element = this.currentElement.firstElementChild;
        const block = readScrollLogicalPosition(this.currentElement.getAttribute("data-autoscroll-block"), "end");
        const behavior = readScrollBehavior(this.currentElement.getAttribute("data-autoscroll-behavior"), "auto");

        if (element) {
          element.scrollIntoView({ block, behavior });
          return true
        }
      }
      return false
    }

    activateScriptElements() {
      for (const inertScriptElement of this.newScriptElements) {
        const activatedScriptElement = activateScriptElement(inertScriptElement);
        inertScriptElement.replaceWith(activatedScriptElement);
      }
    }

    get newScriptElements() {
      return this.currentElement.querySelectorAll("script")
    }
  }

  function readScrollLogicalPosition(value, defaultValue) {
    if (value == "end" || value == "start" || value == "center" || value == "nearest") {
      return value
    } else {
      return defaultValue
    }
  }

  function readScrollBehavior(value, defaultValue) {
    if (value == "auto" || value == "smooth") {
      return value
    } else {
      return defaultValue
    }
  }

  // base IIFE to define idiomorph
  var Idiomorph$1 = (function () {

          //=============================================================================
          // AND NOW IT BEGINS...
          //=============================================================================
          let EMPTY_SET = new Set();

          // default configuration values, updatable by users now
          let defaults = {
              morphStyle: "outerHTML",
              callbacks : {
                  beforeNodeAdded: noOp,
                  afterNodeAdded: noOp,
                  beforeNodeMorphed: noOp,
                  afterNodeMorphed: noOp,
                  beforeNodeRemoved: noOp,
                  afterNodeRemoved: noOp,
                  beforeAttributeUpdated: noOp,

              },
              head: {
                  style: 'merge',
                  shouldPreserve: function (elt) {
                      return elt.getAttribute("im-preserve") === "true";
                  },
                  shouldReAppend: function (elt) {
                      return elt.getAttribute("im-re-append") === "true";
                  },
                  shouldRemove: noOp,
                  afterHeadMorphed: noOp,
              }
          };

          //=============================================================================
          // Core Morphing Algorithm - morph, morphNormalizedContent, morphOldNodeTo, morphChildren
          //=============================================================================
          function morph(oldNode, newContent, config = {}) {

              if (oldNode instanceof Document) {
                  oldNode = oldNode.documentElement;
              }

              if (typeof newContent === 'string') {
                  newContent = parseContent(newContent);
              }

              let normalizedContent = normalizeContent(newContent);

              let ctx = createMorphContext(oldNode, normalizedContent, config);

              return morphNormalizedContent(oldNode, normalizedContent, ctx);
          }

          function morphNormalizedContent(oldNode, normalizedNewContent, ctx) {
              if (ctx.head.block) {
                  let oldHead = oldNode.querySelector('head');
                  let newHead = normalizedNewContent.querySelector('head');
                  if (oldHead && newHead) {
                      let promises = handleHeadElement(newHead, oldHead, ctx);
                      // when head promises resolve, call morph again, ignoring the head tag
                      Promise.all(promises).then(function () {
                          morphNormalizedContent(oldNode, normalizedNewContent, Object.assign(ctx, {
                              head: {
                                  block: false,
                                  ignore: true
                              }
                          }));
                      });
                      return;
                  }
              }

              if (ctx.morphStyle === "innerHTML") {

                  // innerHTML, so we are only updating the children
                  morphChildren(normalizedNewContent, oldNode, ctx);
                  return oldNode.children;

              } else if (ctx.morphStyle === "outerHTML" || ctx.morphStyle == null) {
                  // otherwise find the best element match in the new content, morph that, and merge its siblings
                  // into either side of the best match
                  let bestMatch = findBestNodeMatch(normalizedNewContent, oldNode, ctx);

                  // stash the siblings that will need to be inserted on either side of the best match
                  let previousSibling = bestMatch?.previousSibling;
                  let nextSibling = bestMatch?.nextSibling;

                  // morph it
                  let morphedNode = morphOldNodeTo(oldNode, bestMatch, ctx);

                  if (bestMatch) {
                      // if there was a best match, merge the siblings in too and return the
                      // whole bunch
                      return insertSiblings(previousSibling, morphedNode, nextSibling);
                  } else {
                      // otherwise nothing was added to the DOM
                      return []
                  }
              } else {
                  throw "Do not understand how to morph style " + ctx.morphStyle;
              }
          }


          /**
           * @param possibleActiveElement
           * @param ctx
           * @returns {boolean}
           */
          function ignoreValueOfActiveElement(possibleActiveElement, ctx) {
              return ctx.ignoreActiveValue && possibleActiveElement === document.activeElement && possibleActiveElement !== document.body;
          }

          /**
           * @param oldNode root node to merge content into
           * @param newContent new content to merge
           * @param ctx the merge context
           * @returns {Element} the element that ended up in the DOM
           */
          function morphOldNodeTo(oldNode, newContent, ctx) {
              if (ctx.ignoreActive && oldNode === document.activeElement) ; else if (newContent == null) {
                  if (ctx.callbacks.beforeNodeRemoved(oldNode) === false) return oldNode;

                  oldNode.remove();
                  ctx.callbacks.afterNodeRemoved(oldNode);
                  return null;
              } else if (!isSoftMatch(oldNode, newContent)) {
                  if (ctx.callbacks.beforeNodeRemoved(oldNode) === false) return oldNode;
                  if (ctx.callbacks.beforeNodeAdded(newContent) === false) return oldNode;

                  oldNode.parentElement.replaceChild(newContent, oldNode);
                  ctx.callbacks.afterNodeAdded(newContent);
                  ctx.callbacks.afterNodeRemoved(oldNode);
                  return newContent;
              } else {
                  if (ctx.callbacks.beforeNodeMorphed(oldNode, newContent) === false) return oldNode;

                  if (oldNode instanceof HTMLHeadElement && ctx.head.ignore) ; else if (oldNode instanceof HTMLHeadElement && ctx.head.style !== "morph") {
                      handleHeadElement(newContent, oldNode, ctx);
                  } else {
                      syncNodeFrom(newContent, oldNode, ctx);
                      if (!ignoreValueOfActiveElement(oldNode, ctx)) {
                          morphChildren(newContent, oldNode, ctx);
                      }
                  }
                  ctx.callbacks.afterNodeMorphed(oldNode, newContent);
                  return oldNode;
              }
          }

          /**
           * This is the core algorithm for matching up children.  The idea is to use id sets to try to match up
           * nodes as faithfully as possible.  We greedily match, which allows us to keep the algorithm fast, but
           * by using id sets, we are able to better match up with content deeper in the DOM.
           *
           * Basic algorithm is, for each node in the new content:
           *
           * - if we have reached the end of the old parent, append the new content
           * - if the new content has an id set match with the current insertion point, morph
           * - search for an id set match
           * - if id set match found, morph
           * - otherwise search for a "soft" match
           * - if a soft match is found, morph
           * - otherwise, prepend the new node before the current insertion point
           *
           * The two search algorithms terminate if competing node matches appear to outweigh what can be achieved
           * with the current node.  See findIdSetMatch() and findSoftMatch() for details.
           *
           * @param {Element} newParent the parent element of the new content
           * @param {Element } oldParent the old content that we are merging the new content into
           * @param ctx the merge context
           */
          function morphChildren(newParent, oldParent, ctx) {

              let nextNewChild = newParent.firstChild;
              let insertionPoint = oldParent.firstChild;
              let newChild;

              // run through all the new content
              while (nextNewChild) {

                  newChild = nextNewChild;
                  nextNewChild = newChild.nextSibling;

                  // if we are at the end of the exiting parent's children, just append
                  if (insertionPoint == null) {
                      if (ctx.callbacks.beforeNodeAdded(newChild) === false) return;

                      oldParent.appendChild(newChild);
                      ctx.callbacks.afterNodeAdded(newChild);
                      removeIdsFromConsideration(ctx, newChild);
                      continue;
                  }

                  // if the current node has an id set match then morph
                  if (isIdSetMatch(newChild, insertionPoint, ctx)) {
                      morphOldNodeTo(insertionPoint, newChild, ctx);
                      insertionPoint = insertionPoint.nextSibling;
                      removeIdsFromConsideration(ctx, newChild);
                      continue;
                  }

                  // otherwise search forward in the existing old children for an id set match
                  let idSetMatch = findIdSetMatch(newParent, oldParent, newChild, insertionPoint, ctx);

                  // if we found a potential match, remove the nodes until that point and morph
                  if (idSetMatch) {
                      insertionPoint = removeNodesBetween(insertionPoint, idSetMatch, ctx);
                      morphOldNodeTo(idSetMatch, newChild, ctx);
                      removeIdsFromConsideration(ctx, newChild);
                      continue;
                  }

                  // no id set match found, so scan forward for a soft match for the current node
                  let softMatch = findSoftMatch(newParent, oldParent, newChild, insertionPoint, ctx);

                  // if we found a soft match for the current node, morph
                  if (softMatch) {
                      insertionPoint = removeNodesBetween(insertionPoint, softMatch, ctx);
                      morphOldNodeTo(softMatch, newChild, ctx);
                      removeIdsFromConsideration(ctx, newChild);
                      continue;
                  }

                  // abandon all hope of morphing, just insert the new child before the insertion point
                  // and move on
                  if (ctx.callbacks.beforeNodeAdded(newChild) === false) return;

                  oldParent.insertBefore(newChild, insertionPoint);
                  ctx.callbacks.afterNodeAdded(newChild);
                  removeIdsFromConsideration(ctx, newChild);
              }

              // remove any remaining old nodes that didn't match up with new content
              while (insertionPoint !== null) {

                  let tempNode = insertionPoint;
                  insertionPoint = insertionPoint.nextSibling;
                  removeNode(tempNode, ctx);
              }
          }

          //=============================================================================
          // Attribute Syncing Code
          //=============================================================================

          /**
           * @param attr {String} the attribute to be mutated
           * @param to {Element} the element that is going to be updated
           * @param updateType {("update"|"remove")}
           * @param ctx the merge context
           * @returns {boolean} true if the attribute should be ignored, false otherwise
           */
          function ignoreAttribute(attr, to, updateType, ctx) {
              if(attr === 'value' && ctx.ignoreActiveValue && to === document.activeElement){
                  return true;
              }
              return ctx.callbacks.beforeAttributeUpdated(attr, to, updateType) === false;
          }

          /**
           * syncs a given node with another node, copying over all attributes and
           * inner element state from the 'from' node to the 'to' node
           *
           * @param {Element} from the element to copy attributes & state from
           * @param {Element} to the element to copy attributes & state to
           * @param ctx the merge context
           */
          function syncNodeFrom(from, to, ctx) {
              let type = from.nodeType;

              // if is an element type, sync the attributes from the
              // new node into the new node
              if (type === 1 /* element type */) {
                  const fromAttributes = from.attributes;
                  const toAttributes = to.attributes;
                  for (const fromAttribute of fromAttributes) {
                      if (ignoreAttribute(fromAttribute.name, to, 'update', ctx)) {
                          continue;
                      }
                      if (to.getAttribute(fromAttribute.name) !== fromAttribute.value) {
                          to.setAttribute(fromAttribute.name, fromAttribute.value);
                      }
                  }
                  // iterate backwards to avoid skipping over items when a delete occurs
                  for (let i = toAttributes.length - 1; 0 <= i; i--) {
                      const toAttribute = toAttributes[i];
                      if (ignoreAttribute(toAttribute.name, to, 'remove', ctx)) {
                          continue;
                      }
                      if (!from.hasAttribute(toAttribute.name)) {
                          to.removeAttribute(toAttribute.name);
                      }
                  }
              }

              // sync text nodes
              if (type === 8 /* comment */ || type === 3 /* text */) {
                  if (to.nodeValue !== from.nodeValue) {
                      to.nodeValue = from.nodeValue;
                  }
              }

              if (!ignoreValueOfActiveElement(to, ctx)) {
                  // sync input values
                  syncInputValue(from, to, ctx);
              }
          }

          /**
           * @param from {Element} element to sync the value from
           * @param to {Element} element to sync the value to
           * @param attributeName {String} the attribute name
           * @param ctx the merge context
           */
          function syncBooleanAttribute(from, to, attributeName, ctx) {
              if (from[attributeName] !== to[attributeName]) {
                  let ignoreUpdate = ignoreAttribute(attributeName, to, 'update', ctx);
                  if (!ignoreUpdate) {
                      to[attributeName] = from[attributeName];
                  }
                  if (from[attributeName]) {
                      if (!ignoreUpdate) {
                          to.setAttribute(attributeName, from[attributeName]);
                      }
                  } else {
                      if (!ignoreAttribute(attributeName, to, 'remove', ctx)) {
                          to.removeAttribute(attributeName);
                      }
                  }
              }
          }

          /**
           * NB: many bothans died to bring us information:
           *
           *  https://github.com/patrick-steele-idem/morphdom/blob/master/src/specialElHandlers.js
           *  https://github.com/choojs/nanomorph/blob/master/lib/morph.jsL113
           *
           * @param from {Element} the element to sync the input value from
           * @param to {Element} the element to sync the input value to
           * @param ctx the merge context
           */
          function syncInputValue(from, to, ctx) {
              if (from instanceof HTMLInputElement &&
                  to instanceof HTMLInputElement &&
                  from.type !== 'file') {

                  let fromValue = from.value;
                  let toValue = to.value;

                  // sync boolean attributes
                  syncBooleanAttribute(from, to, 'checked', ctx);
                  syncBooleanAttribute(from, to, 'disabled', ctx);

                  if (!from.hasAttribute('value')) {
                      if (!ignoreAttribute('value', to, 'remove', ctx)) {
                          to.value = '';
                          to.removeAttribute('value');
                      }
                  } else if (fromValue !== toValue) {
                      if (!ignoreAttribute('value', to, 'update', ctx)) {
                          to.setAttribute('value', fromValue);
                          to.value = fromValue;
                      }
                  }
              } else if (from instanceof HTMLOptionElement) {
                  syncBooleanAttribute(from, to, 'selected', ctx);
              } else if (from instanceof HTMLTextAreaElement && to instanceof HTMLTextAreaElement) {
                  let fromValue = from.value;
                  let toValue = to.value;
                  if (ignoreAttribute('value', to, 'update', ctx)) {
                      return;
                  }
                  if (fromValue !== toValue) {
                      to.value = fromValue;
                  }
                  if (to.firstChild && to.firstChild.nodeValue !== fromValue) {
                      to.firstChild.nodeValue = fromValue;
                  }
              }
          }

          //=============================================================================
          // the HEAD tag can be handled specially, either w/ a 'merge' or 'append' style
          //=============================================================================
          function handleHeadElement(newHeadTag, currentHead, ctx) {

              let added = [];
              let removed = [];
              let preserved = [];
              let nodesToAppend = [];

              let headMergeStyle = ctx.head.style;

              // put all new head elements into a Map, by their outerHTML
              let srcToNewHeadNodes = new Map();
              for (const newHeadChild of newHeadTag.children) {
                  srcToNewHeadNodes.set(newHeadChild.outerHTML, newHeadChild);
              }

              // for each elt in the current head
              for (const currentHeadElt of currentHead.children) {

                  // If the current head element is in the map
                  let inNewContent = srcToNewHeadNodes.has(currentHeadElt.outerHTML);
                  let isReAppended = ctx.head.shouldReAppend(currentHeadElt);
                  let isPreserved = ctx.head.shouldPreserve(currentHeadElt);
                  if (inNewContent || isPreserved) {
                      if (isReAppended) {
                          // remove the current version and let the new version replace it and re-execute
                          removed.push(currentHeadElt);
                      } else {
                          // this element already exists and should not be re-appended, so remove it from
                          // the new content map, preserving it in the DOM
                          srcToNewHeadNodes.delete(currentHeadElt.outerHTML);
                          preserved.push(currentHeadElt);
                      }
                  } else {
                      if (headMergeStyle === "append") {
                          // we are appending and this existing element is not new content
                          // so if and only if it is marked for re-append do we do anything
                          if (isReAppended) {
                              removed.push(currentHeadElt);
                              nodesToAppend.push(currentHeadElt);
                          }
                      } else {
                          // if this is a merge, we remove this content since it is not in the new head
                          if (ctx.head.shouldRemove(currentHeadElt) !== false) {
                              removed.push(currentHeadElt);
                          }
                      }
                  }
              }

              // Push the remaining new head elements in the Map into the
              // nodes to append to the head tag
              nodesToAppend.push(...srcToNewHeadNodes.values());

              let promises = [];
              for (const newNode of nodesToAppend) {
                  let newElt = document.createRange().createContextualFragment(newNode.outerHTML).firstChild;
                  if (ctx.callbacks.beforeNodeAdded(newElt) !== false) {
                      if (newElt.href || newElt.src) {
                          let resolve = null;
                          let promise = new Promise(function (_resolve) {
                              resolve = _resolve;
                          });
                          newElt.addEventListener('load', function () {
                              resolve();
                          });
                          promises.push(promise);
                      }
                      currentHead.appendChild(newElt);
                      ctx.callbacks.afterNodeAdded(newElt);
                      added.push(newElt);
                  }
              }

              // remove all removed elements, after we have appended the new elements to avoid
              // additional network requests for things like style sheets
              for (const removedElement of removed) {
                  if (ctx.callbacks.beforeNodeRemoved(removedElement) !== false) {
                      currentHead.removeChild(removedElement);
                      ctx.callbacks.afterNodeRemoved(removedElement);
                  }
              }

              ctx.head.afterHeadMorphed(currentHead, {added: added, kept: preserved, removed: removed});
              return promises;
          }

          function noOp() {
          }

          /*
            Deep merges the config object and the Idiomoroph.defaults object to
            produce a final configuration object
           */
          function mergeDefaults(config) {
              let finalConfig = {};
              // copy top level stuff into final config
              Object.assign(finalConfig, defaults);
              Object.assign(finalConfig, config);

              // copy callbacks into final config (do this to deep merge the callbacks)
              finalConfig.callbacks = {};
              Object.assign(finalConfig.callbacks, defaults.callbacks);
              Object.assign(finalConfig.callbacks, config.callbacks);

              // copy head config into final config  (do this to deep merge the head)
              finalConfig.head = {};
              Object.assign(finalConfig.head, defaults.head);
              Object.assign(finalConfig.head, config.head);
              return finalConfig;
          }

          function createMorphContext(oldNode, newContent, config) {
              config = mergeDefaults(config);
              return {
                  target: oldNode,
                  newContent: newContent,
                  config: config,
                  morphStyle: config.morphStyle,
                  ignoreActive: config.ignoreActive,
                  ignoreActiveValue: config.ignoreActiveValue,
                  idMap: createIdMap(oldNode, newContent),
                  deadIds: new Set(),
                  callbacks: config.callbacks,
                  head: config.head
              }
          }

          function isIdSetMatch(node1, node2, ctx) {
              if (node1 == null || node2 == null) {
                  return false;
              }
              if (node1.nodeType === node2.nodeType && node1.tagName === node2.tagName) {
                  if (node1.id !== "" && node1.id === node2.id) {
                      return true;
                  } else {
                      return getIdIntersectionCount(ctx, node1, node2) > 0;
                  }
              }
              return false;
          }

          function isSoftMatch(node1, node2) {
              if (node1 == null || node2 == null) {
                  return false;
              }
              return node1.nodeType === node2.nodeType && node1.tagName === node2.tagName
          }

          function removeNodesBetween(startInclusive, endExclusive, ctx) {
              while (startInclusive !== endExclusive) {
                  let tempNode = startInclusive;
                  startInclusive = startInclusive.nextSibling;
                  removeNode(tempNode, ctx);
              }
              removeIdsFromConsideration(ctx, endExclusive);
              return endExclusive.nextSibling;
          }

          //=============================================================================
          // Scans forward from the insertionPoint in the old parent looking for a potential id match
          // for the newChild.  We stop if we find a potential id match for the new child OR
          // if the number of potential id matches we are discarding is greater than the
          // potential id matches for the new child
          //=============================================================================
          function findIdSetMatch(newContent, oldParent, newChild, insertionPoint, ctx) {

              // max id matches we are willing to discard in our search
              let newChildPotentialIdCount = getIdIntersectionCount(ctx, newChild, oldParent);

              let potentialMatch = null;

              // only search forward if there is a possibility of an id match
              if (newChildPotentialIdCount > 0) {
                  let potentialMatch = insertionPoint;
                  // if there is a possibility of an id match, scan forward
                  // keep track of the potential id match count we are discarding (the
                  // newChildPotentialIdCount must be greater than this to make it likely
                  // worth it)
                  let otherMatchCount = 0;
                  while (potentialMatch != null) {

                      // If we have an id match, return the current potential match
                      if (isIdSetMatch(newChild, potentialMatch, ctx)) {
                          return potentialMatch;
                      }

                      // computer the other potential matches of this new content
                      otherMatchCount += getIdIntersectionCount(ctx, potentialMatch, newContent);
                      if (otherMatchCount > newChildPotentialIdCount) {
                          // if we have more potential id matches in _other_ content, we
                          // do not have a good candidate for an id match, so return null
                          return null;
                      }

                      // advanced to the next old content child
                      potentialMatch = potentialMatch.nextSibling;
                  }
              }
              return potentialMatch;
          }

          //=============================================================================
          // Scans forward from the insertionPoint in the old parent looking for a potential soft match
          // for the newChild.  We stop if we find a potential soft match for the new child OR
          // if we find a potential id match in the old parents children OR if we find two
          // potential soft matches for the next two pieces of new content
          //=============================================================================
          function findSoftMatch(newContent, oldParent, newChild, insertionPoint, ctx) {

              let potentialSoftMatch = insertionPoint;
              let nextSibling = newChild.nextSibling;
              let siblingSoftMatchCount = 0;

              while (potentialSoftMatch != null) {

                  if (getIdIntersectionCount(ctx, potentialSoftMatch, newContent) > 0) {
                      // the current potential soft match has a potential id set match with the remaining new
                      // content so bail out of looking
                      return null;
                  }

                  // if we have a soft match with the current node, return it
                  if (isSoftMatch(newChild, potentialSoftMatch)) {
                      return potentialSoftMatch;
                  }

                  if (isSoftMatch(nextSibling, potentialSoftMatch)) {
                      // the next new node has a soft match with this node, so
                      // increment the count of future soft matches
                      siblingSoftMatchCount++;
                      nextSibling = nextSibling.nextSibling;

                      // If there are two future soft matches, bail to allow the siblings to soft match
                      // so that we don't consume future soft matches for the sake of the current node
                      if (siblingSoftMatchCount >= 2) {
                          return null;
                      }
                  }

                  // advanced to the next old content child
                  potentialSoftMatch = potentialSoftMatch.nextSibling;
              }

              return potentialSoftMatch;
          }

          function parseContent(newContent) {
              let parser = new DOMParser();

              // remove svgs to avoid false-positive matches on head, etc.
              let contentWithSvgsRemoved = newContent.replace(/<svg(\s[^>]*>|>)([\s\S]*?)<\/svg>/gim, '');

              // if the newContent contains a html, head or body tag, we can simply parse it w/o wrapping
              if (contentWithSvgsRemoved.match(/<\/html>/) || contentWithSvgsRemoved.match(/<\/head>/) || contentWithSvgsRemoved.match(/<\/body>/)) {
                  let content = parser.parseFromString(newContent, "text/html");
                  // if it is a full HTML document, return the document itself as the parent container
                  if (contentWithSvgsRemoved.match(/<\/html>/)) {
                      content.generatedByIdiomorph = true;
                      return content;
                  } else {
                      // otherwise return the html element as the parent container
                      let htmlElement = content.firstChild;
                      if (htmlElement) {
                          htmlElement.generatedByIdiomorph = true;
                          return htmlElement;
                      } else {
                          return null;
                      }
                  }
              } else {
                  // if it is partial HTML, wrap it in a template tag to provide a parent element and also to help
                  // deal with touchy tags like tr, tbody, etc.
                  let responseDoc = parser.parseFromString("<body><template>" + newContent + "</template></body>", "text/html");
                  let content = responseDoc.body.querySelector('template').content;
                  content.generatedByIdiomorph = true;
                  return content
              }
          }

          function normalizeContent(newContent) {
              if (newContent == null) {
                  // noinspection UnnecessaryLocalVariableJS
                  const dummyParent = document.createElement('div');
                  return dummyParent;
              } else if (newContent.generatedByIdiomorph) {
                  // the template tag created by idiomorph parsing can serve as a dummy parent
                  return newContent;
              } else if (newContent instanceof Node) {
                  // a single node is added as a child to a dummy parent
                  const dummyParent = document.createElement('div');
                  dummyParent.append(newContent);
                  return dummyParent;
              } else {
                  // all nodes in the array or HTMLElement collection are consolidated under
                  // a single dummy parent element
                  const dummyParent = document.createElement('div');
                  for (const elt of [...newContent]) {
                      dummyParent.append(elt);
                  }
                  return dummyParent;
              }
          }

          function insertSiblings(previousSibling, morphedNode, nextSibling) {
              let stack = [];
              let added = [];
              while (previousSibling != null) {
                  stack.push(previousSibling);
                  previousSibling = previousSibling.previousSibling;
              }
              while (stack.length > 0) {
                  let node = stack.pop();
                  added.push(node); // push added preceding siblings on in order and insert
                  morphedNode.parentElement.insertBefore(node, morphedNode);
              }
              added.push(morphedNode);
              while (nextSibling != null) {
                  stack.push(nextSibling);
                  added.push(nextSibling); // here we are going in order, so push on as we scan, rather than add
                  nextSibling = nextSibling.nextSibling;
              }
              while (stack.length > 0) {
                  morphedNode.parentElement.insertBefore(stack.pop(), morphedNode.nextSibling);
              }
              return added;
          }

          function findBestNodeMatch(newContent, oldNode, ctx) {
              let currentElement;
              currentElement = newContent.firstChild;
              let bestElement = currentElement;
              let score = 0;
              while (currentElement) {
                  let newScore = scoreElement(currentElement, oldNode, ctx);
                  if (newScore > score) {
                      bestElement = currentElement;
                      score = newScore;
                  }
                  currentElement = currentElement.nextSibling;
              }
              return bestElement;
          }

          function scoreElement(node1, node2, ctx) {
              if (isSoftMatch(node1, node2)) {
                  return .5 + getIdIntersectionCount(ctx, node1, node2);
              }
              return 0;
          }

          function removeNode(tempNode, ctx) {
              removeIdsFromConsideration(ctx, tempNode);
              if (ctx.callbacks.beforeNodeRemoved(tempNode) === false) return;

              tempNode.remove();
              ctx.callbacks.afterNodeRemoved(tempNode);
          }

          //=============================================================================
          // ID Set Functions
          //=============================================================================

          function isIdInConsideration(ctx, id) {
              return !ctx.deadIds.has(id);
          }

          function idIsWithinNode(ctx, id, targetNode) {
              let idSet = ctx.idMap.get(targetNode) || EMPTY_SET;
              return idSet.has(id);
          }

          function removeIdsFromConsideration(ctx, node) {
              let idSet = ctx.idMap.get(node) || EMPTY_SET;
              for (const id of idSet) {
                  ctx.deadIds.add(id);
              }
          }

          function getIdIntersectionCount(ctx, node1, node2) {
              let sourceSet = ctx.idMap.get(node1) || EMPTY_SET;
              let matchCount = 0;
              for (const id of sourceSet) {
                  // a potential match is an id in the source and potentialIdsSet, but
                  // that has not already been merged into the DOM
                  if (isIdInConsideration(ctx, id) && idIsWithinNode(ctx, id, node2)) {
                      ++matchCount;
                  }
              }
              return matchCount;
          }

          /**
           * A bottom up algorithm that finds all elements with ids inside of the node
           * argument and populates id sets for those nodes and all their parents, generating
           * a set of ids contained within all nodes for the entire hierarchy in the DOM
           *
           * @param node {Element}
           * @param {Map<Node, Set<String>>} idMap
           */
          function populateIdMapForNode(node, idMap) {
              let nodeParent = node.parentElement;
              // find all elements with an id property
              let idElements = node.querySelectorAll('[id]');
              for (const elt of idElements) {
                  let current = elt;
                  // walk up the parent hierarchy of that element, adding the id
                  // of element to the parent's id set
                  while (current !== nodeParent && current != null) {
                      let idSet = idMap.get(current);
                      // if the id set doesn't exist, create it and insert it in the  map
                      if (idSet == null) {
                          idSet = new Set();
                          idMap.set(current, idSet);
                      }
                      idSet.add(elt.id);
                      current = current.parentElement;
                  }
              }
          }

          /**
           * This function computes a map of nodes to all ids contained within that node (inclusive of the
           * node).  This map can be used to ask if two nodes have intersecting sets of ids, which allows
           * for a looser definition of "matching" than tradition id matching, and allows child nodes
           * to contribute to a parent nodes matching.
           *
           * @param {Element} oldContent  the old content that will be morphed
           * @param {Element} newContent  the new content to morph to
           * @returns {Map<Node, Set<String>>} a map of nodes to id sets for the
           */
          function createIdMap(oldContent, newContent) {
              let idMap = new Map();
              populateIdMapForNode(oldContent, idMap);
              populateIdMapForNode(newContent, idMap);
              return idMap;
          }

          //=============================================================================
          // This is what ends up becoming the Idiomorph global object
          //=============================================================================
          return {
              morph,
              defaults
          }
      })();

  function morphElements(currentElement, newElement, { callbacks, ...options } = {}) {
    Idiomorph$1.morph(currentElement, newElement, {
      ...options,
      callbacks: new DefaultIdiomorphCallbacks(callbacks)
    });
  }

  function morphChildren(currentElement, newElement) {
    morphElements(currentElement, newElement.children, {
      morphStyle: "innerHTML"
    });
  }

  class DefaultIdiomorphCallbacks {
    #beforeNodeMorphed

    constructor({ beforeNodeMorphed } = {}) {
      this.#beforeNodeMorphed = beforeNodeMorphed || (() => true);
    }

    beforeNodeAdded = (node) => {
      return !(node.id && node.hasAttribute("data-turbo-permanent") && document.getElementById(node.id))
    }

    beforeNodeMorphed = (currentElement, newElement) => {
      if (currentElement instanceof Element) {
        if (!currentElement.hasAttribute("data-turbo-permanent") && this.#beforeNodeMorphed(currentElement, newElement)) {
          const event = dispatch("turbo:before-morph-element", {
            cancelable: true,
            target: currentElement,
            detail: { currentElement, newElement }
          });

          return !event.defaultPrevented
        } else {
          return false
        }
      }
    }

    beforeAttributeUpdated = (attributeName, target, mutationType) => {
      const event = dispatch("turbo:before-morph-attribute", {
        cancelable: true,
        target,
        detail: { attributeName, mutationType }
      });

      return !event.defaultPrevented
    }

    beforeNodeRemoved = (node) => {
      return this.beforeNodeMorphed(node)
    }

    afterNodeMorphed = (currentElement, newElement) => {
      if (currentElement instanceof Element) {
        dispatch("turbo:morph-element", {
          target: currentElement,
          detail: { currentElement, newElement }
        });
      }
    }
  }

  class MorphingFrameRenderer extends FrameRenderer {
    static renderElement(currentElement, newElement) {
      dispatch("turbo:before-frame-morph", {
        target: currentElement,
        detail: { currentElement, newElement }
      });

      morphChildren(currentElement, newElement);
    }

    async preservingPermanentElements(callback) {
      return await callback()
    }
  }

  class ProgressBar {
    static animationDuration = 300 /*ms*/

    static get defaultCSS() {
      return unindent`
      .turbo-progress-bar {
        position: fixed;
        display: block;
        top: 0;
        left: 0;
        height: 3px;
        background: #0076ff;
        z-index: 2147483647;
        transition:
          width ${ProgressBar.animationDuration}ms ease-out,
          opacity ${ProgressBar.animationDuration / 2}ms ${ProgressBar.animationDuration / 2}ms ease-in;
        transform: translate3d(0, 0, 0);
      }
    `
    }

    hiding = false
    value = 0
    visible = false

    constructor() {
      this.stylesheetElement = this.createStylesheetElement();
      this.progressElement = this.createProgressElement();
      this.installStylesheetElement();
      this.setValue(0);
    }

    show() {
      if (!this.visible) {
        this.visible = true;
        this.installProgressElement();
        this.startTrickling();
      }
    }

    hide() {
      if (this.visible && !this.hiding) {
        this.hiding = true;
        this.fadeProgressElement(() => {
          this.uninstallProgressElement();
          this.stopTrickling();
          this.visible = false;
          this.hiding = false;
        });
      }
    }

    setValue(value) {
      this.value = value;
      this.refresh();
    }

    // Private

    installStylesheetElement() {
      document.head.insertBefore(this.stylesheetElement, document.head.firstChild);
    }

    installProgressElement() {
      this.progressElement.style.width = "0";
      this.progressElement.style.opacity = "1";
      document.documentElement.insertBefore(this.progressElement, document.body);
      this.refresh();
    }

    fadeProgressElement(callback) {
      this.progressElement.style.opacity = "0";
      setTimeout(callback, ProgressBar.animationDuration * 1.5);
    }

    uninstallProgressElement() {
      if (this.progressElement.parentNode) {
        document.documentElement.removeChild(this.progressElement);
      }
    }

    startTrickling() {
      if (!this.trickleInterval) {
        this.trickleInterval = window.setInterval(this.trickle, ProgressBar.animationDuration);
      }
    }

    stopTrickling() {
      window.clearInterval(this.trickleInterval);
      delete this.trickleInterval;
    }

    trickle = () => {
      this.setValue(this.value + Math.random() / 100);
    }

    refresh() {
      requestAnimationFrame(() => {
        this.progressElement.style.width = `${10 + this.value * 90}%`;
      });
    }

    createStylesheetElement() {
      const element = document.createElement("style");
      element.type = "text/css";
      element.textContent = ProgressBar.defaultCSS;
      const cspNonce = getCspNonce();
      if (cspNonce) {
        element.nonce = cspNonce;
      }
      return element
    }

    createProgressElement() {
      const element = document.createElement("div");
      element.className = "turbo-progress-bar";
      return element
    }
  }

  class HeadSnapshot extends Snapshot {
    detailsByOuterHTML = this.children
      .filter((element) => !elementIsNoscript(element))
      .map((element) => elementWithoutNonce(element))
      .reduce((result, element) => {
        const { outerHTML } = element;
        const details =
          outerHTML in result
            ? result[outerHTML]
            : {
                type: elementType(element),
                tracked: elementIsTracked(element),
                elements: []
              };
        return {
          ...result,
          [outerHTML]: {
            ...details,
            elements: [...details.elements, element]
          }
        }
      }, {})

    get trackedElementSignature() {
      return Object.keys(this.detailsByOuterHTML)
        .filter((outerHTML) => this.detailsByOuterHTML[outerHTML].tracked)
        .join("")
    }

    getScriptElementsNotInSnapshot(snapshot) {
      return this.getElementsMatchingTypeNotInSnapshot("script", snapshot)
    }

    getStylesheetElementsNotInSnapshot(snapshot) {
      return this.getElementsMatchingTypeNotInSnapshot("stylesheet", snapshot)
    }

    getElementsMatchingTypeNotInSnapshot(matchedType, snapshot) {
      return Object.keys(this.detailsByOuterHTML)
        .filter((outerHTML) => !(outerHTML in snapshot.detailsByOuterHTML))
        .map((outerHTML) => this.detailsByOuterHTML[outerHTML])
        .filter(({ type }) => type == matchedType)
        .map(({ elements: [element] }) => element)
    }

    get provisionalElements() {
      return Object.keys(this.detailsByOuterHTML).reduce((result, outerHTML) => {
        const { type, tracked, elements } = this.detailsByOuterHTML[outerHTML];
        if (type == null && !tracked) {
          return [...result, ...elements]
        } else if (elements.length > 1) {
          return [...result, ...elements.slice(1)]
        } else {
          return result
        }
      }, [])
    }

    getMetaValue(name) {
      const element = this.findMetaElementByName(name);
      return element ? element.getAttribute("content") : null
    }

    findMetaElementByName(name) {
      return Object.keys(this.detailsByOuterHTML).reduce((result, outerHTML) => {
        const {
          elements: [element]
        } = this.detailsByOuterHTML[outerHTML];
        return elementIsMetaElementWithName(element, name) ? element : result
      }, undefined | undefined)
    }
  }

  function elementType(element) {
    if (elementIsScript(element)) {
      return "script"
    } else if (elementIsStylesheet(element)) {
      return "stylesheet"
    }
  }

  function elementIsTracked(element) {
    return element.getAttribute("data-turbo-track") == "reload"
  }

  function elementIsScript(element) {
    const tagName = element.localName;
    return tagName == "script"
  }

  function elementIsNoscript(element) {
    const tagName = element.localName;
    return tagName == "noscript"
  }

  function elementIsStylesheet(element) {
    const tagName = element.localName;
    return tagName == "style" || (tagName == "link" && element.getAttribute("rel") == "stylesheet")
  }

  function elementIsMetaElementWithName(element, name) {
    const tagName = element.localName;
    return tagName == "meta" && element.getAttribute("name") == name
  }

  function elementWithoutNonce(element) {
    if (element.hasAttribute("nonce")) {
      element.setAttribute("nonce", "");
    }

    return element
  }

  class PageSnapshot extends Snapshot {
    static fromHTMLString(html = "") {
      return this.fromDocument(parseHTMLDocument(html))
    }

    static fromElement(element) {
      return this.fromDocument(element.ownerDocument)
    }

    static fromDocument({ documentElement, body, head }) {
      return new this(documentElement, body, new HeadSnapshot(head))
    }

    constructor(documentElement, body, headSnapshot) {
      super(body);
      this.documentElement = documentElement;
      this.headSnapshot = headSnapshot;
    }

    clone() {
      const clonedElement = this.element.cloneNode(true);

      const selectElements = this.element.querySelectorAll("select");
      const clonedSelectElements = clonedElement.querySelectorAll("select");

      for (const [index, source] of selectElements.entries()) {
        const clone = clonedSelectElements[index];
        for (const option of clone.selectedOptions) option.selected = false;
        for (const option of source.selectedOptions) clone.options[option.index].selected = true;
      }

      for (const clonedPasswordInput of clonedElement.querySelectorAll('input[type="password"]')) {
        clonedPasswordInput.value = "";
      }

      return new PageSnapshot(this.documentElement, clonedElement, this.headSnapshot)
    }

    get lang() {
      return this.documentElement.getAttribute("lang")
    }

    get headElement() {
      return this.headSnapshot.element
    }

    get rootLocation() {
      const root = this.getSetting("root") ?? "/";
      return expandURL(root)
    }

    get cacheControlValue() {
      return this.getSetting("cache-control")
    }

    get isPreviewable() {
      return this.cacheControlValue != "no-preview"
    }

    get isCacheable() {
      return this.cacheControlValue != "no-cache"
    }

    get isVisitable() {
      return this.getSetting("visit-control") != "reload"
    }

    get prefersViewTransitions() {
      return this.headSnapshot.getMetaValue("view-transition") === "same-origin"
    }

    get shouldMorphPage() {
      return this.getSetting("refresh-method") === "morph"
    }

    get shouldPreserveScrollPosition() {
      return this.getSetting("refresh-scroll") === "preserve"
    }

    // Private

    getSetting(name) {
      return this.headSnapshot.getMetaValue(`turbo-${name}`)
    }
  }

  class ViewTransitioner {
    #viewTransitionStarted = false
    #lastOperation = Promise.resolve()

    renderChange(useViewTransition, render) {
      if (useViewTransition && this.viewTransitionsAvailable && !this.#viewTransitionStarted) {
        this.#viewTransitionStarted = true;
        this.#lastOperation = this.#lastOperation.then(async () => {
          await document.startViewTransition(render).finished;
        });
      } else {
        this.#lastOperation = this.#lastOperation.then(render);
      }

      return this.#lastOperation
    }

    get viewTransitionsAvailable() {
      return document.startViewTransition
    }
  }

  const defaultOptions = {
    action: "advance",
    historyChanged: false,
    visitCachedSnapshot: () => {},
    willRender: true,
    updateHistory: true,
    shouldCacheSnapshot: true,
    acceptsStreamResponse: false
  };

  const TimingMetric = {
    visitStart: "visitStart",
    requestStart: "requestStart",
    requestEnd: "requestEnd",
    visitEnd: "visitEnd"
  };

  const VisitState = {
    initialized: "initialized",
    started: "started",
    canceled: "canceled",
    failed: "failed",
    completed: "completed"
  };

  const SystemStatusCode = {
    networkFailure: 0,
    timeoutFailure: -1,
    contentTypeMismatch: -2
  };

  const Direction = {
    advance: "forward",
    restore: "back",
    replace: "none"
  };

  class Visit {
    identifier = uuid() // Required by turbo-ios
    timingMetrics = {}

    followedRedirect = false
    historyChanged = false
    scrolled = false
    shouldCacheSnapshot = true
    acceptsStreamResponse = false
    snapshotCached = false
    state = VisitState.initialized
    viewTransitioner = new ViewTransitioner()

    constructor(delegate, location, restorationIdentifier, options = {}) {
      this.delegate = delegate;
      this.location = location;
      this.restorationIdentifier = restorationIdentifier || uuid();

      const {
        action,
        historyChanged,
        referrer,
        snapshot,
        snapshotHTML,
        response,
        visitCachedSnapshot,
        willRender,
        updateHistory,
        shouldCacheSnapshot,
        acceptsStreamResponse,
        direction
      } = {
        ...defaultOptions,
        ...options
      };
      this.action = action;
      this.historyChanged = historyChanged;
      this.referrer = referrer;
      this.snapshot = snapshot;
      this.snapshotHTML = snapshotHTML;
      this.response = response;
      this.isSamePage = this.delegate.locationWithActionIsSamePage(this.location, this.action);
      this.isPageRefresh = this.view.isPageRefresh(this);
      this.visitCachedSnapshot = visitCachedSnapshot;
      this.willRender = willRender;
      this.updateHistory = updateHistory;
      this.scrolled = !willRender;
      this.shouldCacheSnapshot = shouldCacheSnapshot;
      this.acceptsStreamResponse = acceptsStreamResponse;
      this.direction = direction || Direction[action];
    }

    get adapter() {
      return this.delegate.adapter
    }

    get view() {
      return this.delegate.view
    }

    get history() {
      return this.delegate.history
    }

    get restorationData() {
      return this.history.getRestorationDataForIdentifier(this.restorationIdentifier)
    }

    get silent() {
      return this.isSamePage
    }

    start() {
      if (this.state == VisitState.initialized) {
        this.recordTimingMetric(TimingMetric.visitStart);
        this.state = VisitState.started;
        this.adapter.visitStarted(this);
        this.delegate.visitStarted(this);
      }
    }

    cancel() {
      if (this.state == VisitState.started) {
        if (this.request) {
          this.request.cancel();
        }
        this.cancelRender();
        this.state = VisitState.canceled;
      }
    }

    complete() {
      if (this.state == VisitState.started) {
        this.recordTimingMetric(TimingMetric.visitEnd);
        this.adapter.visitCompleted(this);
        this.state = VisitState.completed;
        this.followRedirect();

        if (!this.followedRedirect) {
          this.delegate.visitCompleted(this);
        }
      }
    }

    fail() {
      if (this.state == VisitState.started) {
        this.state = VisitState.failed;
        this.adapter.visitFailed(this);
        this.delegate.visitCompleted(this);
      }
    }

    changeHistory() {
      if (!this.historyChanged && this.updateHistory) {
        const actionForHistory = this.location.href === this.referrer?.href ? "replace" : this.action;
        const method = getHistoryMethodForAction(actionForHistory);
        this.history.update(method, this.location, this.restorationIdentifier);
        this.historyChanged = true;
      }
    }

    issueRequest() {
      if (this.hasPreloadedResponse()) {
        this.simulateRequest();
      } else if (this.shouldIssueRequest() && !this.request) {
        this.request = new FetchRequest(this, FetchMethod.get, this.location);
        this.request.perform();
      }
    }

    simulateRequest() {
      if (this.response) {
        this.startRequest();
        this.recordResponse();
        this.finishRequest();
      }
    }

    startRequest() {
      this.recordTimingMetric(TimingMetric.requestStart);
      this.adapter.visitRequestStarted(this);
    }

    recordResponse(response = this.response) {
      this.response = response;
      if (response) {
        const { statusCode } = response;
        if (isSuccessful(statusCode)) {
          this.adapter.visitRequestCompleted(this);
        } else {
          this.adapter.visitRequestFailedWithStatusCode(this, statusCode);
        }
      }
    }

    finishRequest() {
      this.recordTimingMetric(TimingMetric.requestEnd);
      this.adapter.visitRequestFinished(this);
    }

    loadResponse() {
      if (this.response) {
        const { statusCode, responseHTML } = this.response;
        this.render(async () => {
          if (this.shouldCacheSnapshot) this.cacheSnapshot();
          if (this.view.renderPromise) await this.view.renderPromise;

          if (isSuccessful(statusCode) && responseHTML != null) {
            const snapshot = PageSnapshot.fromHTMLString(responseHTML);
            await this.renderPageSnapshot(snapshot, false);

            this.adapter.visitRendered(this);
            this.complete();
          } else {
            await this.view.renderError(PageSnapshot.fromHTMLString(responseHTML), this);
            this.adapter.visitRendered(this);
            this.fail();
          }
        });
      }
    }

    getCachedSnapshot() {
      const snapshot = this.view.getCachedSnapshotForLocation(this.location) || this.getPreloadedSnapshot();

      if (snapshot && (!getAnchor(this.location) || snapshot.hasAnchor(getAnchor(this.location)))) {
        if (this.action == "restore" || snapshot.isPreviewable) {
          return snapshot
        }
      }
    }

    getPreloadedSnapshot() {
      if (this.snapshotHTML) {
        return PageSnapshot.fromHTMLString(this.snapshotHTML)
      }
    }

    hasCachedSnapshot() {
      return this.getCachedSnapshot() != null
    }

    loadCachedSnapshot() {
      const snapshot = this.getCachedSnapshot();
      if (snapshot) {
        const isPreview = this.shouldIssueRequest();
        this.render(async () => {
          this.cacheSnapshot();
          if (this.isSamePage || this.isPageRefresh) {
            this.adapter.visitRendered(this);
          } else {
            if (this.view.renderPromise) await this.view.renderPromise;

            await this.renderPageSnapshot(snapshot, isPreview);

            this.adapter.visitRendered(this);
            if (!isPreview) {
              this.complete();
            }
          }
        });
      }
    }

    followRedirect() {
      if (this.redirectedToLocation && !this.followedRedirect && this.response?.redirected) {
        this.adapter.visitProposedToLocation(this.redirectedToLocation, {
          action: "replace",
          response: this.response,
          shouldCacheSnapshot: false,
          willRender: false
        });
        this.followedRedirect = true;
      }
    }

    goToSamePageAnchor() {
      if (this.isSamePage) {
        this.render(async () => {
          this.cacheSnapshot();
          this.performScroll();
          this.changeHistory();
          this.adapter.visitRendered(this);
        });
      }
    }

    // Fetch request delegate

    prepareRequest(request) {
      if (this.acceptsStreamResponse) {
        request.acceptResponseType(StreamMessage.contentType);
      }
    }

    requestStarted() {
      this.startRequest();
    }

    requestPreventedHandlingResponse(_request, _response) {}

    async requestSucceededWithResponse(request, response) {
      const responseHTML = await response.responseHTML;
      const { redirected, statusCode } = response;
      if (responseHTML == undefined) {
        this.recordResponse({
          statusCode: SystemStatusCode.contentTypeMismatch,
          redirected
        });
      } else {
        this.redirectedToLocation = response.redirected ? response.location : undefined;
        this.recordResponse({ statusCode: statusCode, responseHTML, redirected });
      }
    }

    async requestFailedWithResponse(request, response) {
      const responseHTML = await response.responseHTML;
      const { redirected, statusCode } = response;
      if (responseHTML == undefined) {
        this.recordResponse({
          statusCode: SystemStatusCode.contentTypeMismatch,
          redirected
        });
      } else {
        this.recordResponse({ statusCode: statusCode, responseHTML, redirected });
      }
    }

    requestErrored(_request, _error) {
      this.recordResponse({
        statusCode: SystemStatusCode.networkFailure,
        redirected: false
      });
    }

    requestFinished() {
      this.finishRequest();
    }

    // Scrolling

    performScroll() {
      if (!this.scrolled && !this.view.forceReloaded && !this.view.shouldPreserveScrollPosition(this)) {
        if (this.action == "restore") {
          this.scrollToRestoredPosition() || this.scrollToAnchor() || this.view.scrollToTop();
        } else {
          this.scrollToAnchor() || this.view.scrollToTop();
        }
        if (this.isSamePage) {
          this.delegate.visitScrolledToSamePageLocation(this.view.lastRenderedLocation, this.location);
        }

        this.scrolled = true;
      }
    }

    scrollToRestoredPosition() {
      const { scrollPosition } = this.restorationData;
      if (scrollPosition) {
        this.view.scrollToPosition(scrollPosition);
        return true
      }
    }

    scrollToAnchor() {
      const anchor = getAnchor(this.location);
      if (anchor != null) {
        this.view.scrollToAnchor(anchor);
        return true
      }
    }

    // Instrumentation

    recordTimingMetric(metric) {
      this.timingMetrics[metric] = new Date().getTime();
    }

    getTimingMetrics() {
      return { ...this.timingMetrics }
    }

    // Private

    getHistoryMethodForAction(action) {
      switch (action) {
        case "replace":
          return history.replaceState
        case "advance":
        case "restore":
          return history.pushState
      }
    }

    hasPreloadedResponse() {
      return typeof this.response == "object"
    }

    shouldIssueRequest() {
      if (this.isSamePage) {
        return false
      } else if (this.action == "restore") {
        return !this.hasCachedSnapshot()
      } else {
        return this.willRender
      }
    }

    cacheSnapshot() {
      if (!this.snapshotCached) {
        this.view.cacheSnapshot(this.snapshot).then((snapshot) => snapshot && this.visitCachedSnapshot(snapshot));
        this.snapshotCached = true;
      }
    }

    async render(callback) {
      this.cancelRender();
      await new Promise((resolve) => {
        this.frame =
          document.visibilityState === "hidden" ? setTimeout(() => resolve(), 0) : requestAnimationFrame(() => resolve());
      });
      await callback();
      delete this.frame;
    }

    async renderPageSnapshot(snapshot, isPreview) {
      await this.viewTransitioner.renderChange(this.view.shouldTransitionTo(snapshot), async () => {
        await this.view.renderPage(snapshot, isPreview, this.willRender, this);
        this.performScroll();
      });
    }

    cancelRender() {
      if (this.frame) {
        cancelAnimationFrame(this.frame);
        delete this.frame;
      }
    }
  }

  function isSuccessful(statusCode) {
    return statusCode >= 200 && statusCode < 300
  }

  class BrowserAdapter {
    progressBar = new ProgressBar()

    constructor(session) {
      this.session = session;
    }

    visitProposedToLocation(location, options) {
      if (locationIsVisitable(location, this.navigator.rootLocation)) {
        this.navigator.startVisit(location, options?.restorationIdentifier || uuid(), options);
      } else {
        window.location.href = location.toString();
      }
    }

    visitStarted(visit) {
      this.location = visit.location;
      visit.loadCachedSnapshot();
      visit.issueRequest();
      visit.goToSamePageAnchor();
    }

    visitRequestStarted(visit) {
      this.progressBar.setValue(0);
      if (visit.hasCachedSnapshot() || visit.action != "restore") {
        this.showVisitProgressBarAfterDelay();
      } else {
        this.showProgressBar();
      }
    }

    visitRequestCompleted(visit) {
      visit.loadResponse();
    }

    visitRequestFailedWithStatusCode(visit, statusCode) {
      switch (statusCode) {
        case SystemStatusCode.networkFailure:
        case SystemStatusCode.timeoutFailure:
        case SystemStatusCode.contentTypeMismatch:
          return this.reload({
            reason: "request_failed",
            context: {
              statusCode
            }
          })
        default:
          return visit.loadResponse()
      }
    }

    visitRequestFinished(_visit) {}

    visitCompleted(_visit) {
      this.progressBar.setValue(1);
      this.hideVisitProgressBar();
    }

    pageInvalidated(reason) {
      this.reload(reason);
    }

    visitFailed(_visit) {
      this.progressBar.setValue(1);
      this.hideVisitProgressBar();
    }

    visitRendered(_visit) {}

    // Form Submission Delegate

    formSubmissionStarted(_formSubmission) {
      this.progressBar.setValue(0);
      this.showFormProgressBarAfterDelay();
    }

    formSubmissionFinished(_formSubmission) {
      this.progressBar.setValue(1);
      this.hideFormProgressBar();
    }

    // Private

    showVisitProgressBarAfterDelay() {
      this.visitProgressBarTimeout = window.setTimeout(this.showProgressBar, this.session.progressBarDelay);
    }

    hideVisitProgressBar() {
      this.progressBar.hide();
      if (this.visitProgressBarTimeout != null) {
        window.clearTimeout(this.visitProgressBarTimeout);
        delete this.visitProgressBarTimeout;
      }
    }

    showFormProgressBarAfterDelay() {
      if (this.formProgressBarTimeout == null) {
        this.formProgressBarTimeout = window.setTimeout(this.showProgressBar, this.session.progressBarDelay);
      }
    }

    hideFormProgressBar() {
      this.progressBar.hide();
      if (this.formProgressBarTimeout != null) {
        window.clearTimeout(this.formProgressBarTimeout);
        delete this.formProgressBarTimeout;
      }
    }

    showProgressBar = () => {
      this.progressBar.show();
    }

    reload(reason) {
      dispatch("turbo:reload", { detail: reason });

      window.location.href = this.location?.toString() || window.location.href;
    }

    get navigator() {
      return this.session.navigator
    }
  }

  class CacheObserver {
    selector = "[data-turbo-temporary]"
    deprecatedSelector = "[data-turbo-cache=false]"

    started = false

    start() {
      if (!this.started) {
        this.started = true;
        addEventListener("turbo:before-cache", this.removeTemporaryElements, false);
      }
    }

    stop() {
      if (this.started) {
        this.started = false;
        removeEventListener("turbo:before-cache", this.removeTemporaryElements, false);
      }
    }

    removeTemporaryElements = (_event) => {
      for (const element of this.temporaryElements) {
        element.remove();
      }
    }

    get temporaryElements() {
      return [...document.querySelectorAll(this.selector), ...this.temporaryElementsWithDeprecation]
    }

    get temporaryElementsWithDeprecation() {
      const elements = document.querySelectorAll(this.deprecatedSelector);

      if (elements.length) {
        console.warn(
          `The ${this.deprecatedSelector} selector is deprecated and will be removed in a future version. Use ${this.selector} instead.`
        );
      }

      return [...elements]
    }
  }

  class FrameRedirector {
    constructor(session, element) {
      this.session = session;
      this.element = element;
      this.linkInterceptor = new LinkInterceptor(this, element);
      this.formSubmitObserver = new FormSubmitObserver(this, element);
    }

    start() {
      this.linkInterceptor.start();
      this.formSubmitObserver.start();
    }

    stop() {
      this.linkInterceptor.stop();
      this.formSubmitObserver.stop();
    }

    // Link interceptor delegate

    shouldInterceptLinkClick(element, _location, _event) {
      return this.#shouldRedirect(element)
    }

    linkClickIntercepted(element, url, event) {
      const frame = this.#findFrameElement(element);
      if (frame) {
        frame.delegate.linkClickIntercepted(element, url, event);
      }
    }

    // Form submit observer delegate

    willSubmitForm(element, submitter) {
      return (
        element.closest("turbo-frame") == null &&
        this.#shouldSubmit(element, submitter) &&
        this.#shouldRedirect(element, submitter)
      )
    }

    formSubmitted(element, submitter) {
      const frame = this.#findFrameElement(element, submitter);
      if (frame) {
        frame.delegate.formSubmitted(element, submitter);
      }
    }

    #shouldSubmit(form, submitter) {
      const action = getAction$1(form, submitter);
      const meta = this.element.ownerDocument.querySelector(`meta[name="turbo-root"]`);
      const rootLocation = expandURL(meta?.content ?? "/");

      return this.#shouldRedirect(form, submitter) && locationIsVisitable(action, rootLocation)
    }

    #shouldRedirect(element, submitter) {
      const isNavigatable =
        element instanceof HTMLFormElement
          ? this.session.submissionIsNavigatable(element, submitter)
          : this.session.elementIsNavigatable(element);

      if (isNavigatable) {
        const frame = this.#findFrameElement(element, submitter);
        return frame ? frame != element.closest("turbo-frame") : false
      } else {
        return false
      }
    }

    #findFrameElement(element, submitter) {
      const id = submitter?.getAttribute("data-turbo-frame") || element.getAttribute("data-turbo-frame");
      if (id && id != "_top") {
        const frame = this.element.querySelector(`#${id}:not([disabled])`);
        if (frame instanceof FrameElement) {
          return frame
        }
      }
    }
  }

  class History {
    location
    restorationIdentifier = uuid()
    restorationData = {}
    started = false
    pageLoaded = false
    currentIndex = 0

    constructor(delegate) {
      this.delegate = delegate;
    }

    start() {
      if (!this.started) {
        addEventListener("popstate", this.onPopState, false);
        addEventListener("load", this.onPageLoad, false);
        this.currentIndex = history.state?.turbo?.restorationIndex || 0;
        this.started = true;
        this.replace(new URL(window.location.href));
      }
    }

    stop() {
      if (this.started) {
        removeEventListener("popstate", this.onPopState, false);
        removeEventListener("load", this.onPageLoad, false);
        this.started = false;
      }
    }

    push(location, restorationIdentifier) {
      this.update(history.pushState, location, restorationIdentifier);
    }

    replace(location, restorationIdentifier) {
      this.update(history.replaceState, location, restorationIdentifier);
    }

    update(method, location, restorationIdentifier = uuid()) {
      if (method === history.pushState) ++this.currentIndex;

      const state = { turbo: { restorationIdentifier, restorationIndex: this.currentIndex } };
      method.call(history, state, "", location.href);
      this.location = location;
      this.restorationIdentifier = restorationIdentifier;
    }

    // Restoration data

    getRestorationDataForIdentifier(restorationIdentifier) {
      return this.restorationData[restorationIdentifier] || {}
    }

    updateRestorationData(additionalData) {
      const { restorationIdentifier } = this;
      const restorationData = this.restorationData[restorationIdentifier];
      this.restorationData[restorationIdentifier] = {
        ...restorationData,
        ...additionalData
      };
    }

    // Scroll restoration

    assumeControlOfScrollRestoration() {
      if (!this.previousScrollRestoration) {
        this.previousScrollRestoration = history.scrollRestoration ?? "auto";
        history.scrollRestoration = "manual";
      }
    }

    relinquishControlOfScrollRestoration() {
      if (this.previousScrollRestoration) {
        history.scrollRestoration = this.previousScrollRestoration;
        delete this.previousScrollRestoration;
      }
    }

    // Event handlers

    onPopState = (event) => {
      if (this.shouldHandlePopState()) {
        const { turbo } = event.state || {};
        if (turbo) {
          this.location = new URL(window.location.href);
          const { restorationIdentifier, restorationIndex } = turbo;
          this.restorationIdentifier = restorationIdentifier;
          const direction = restorationIndex > this.currentIndex ? "forward" : "back";
          this.delegate.historyPoppedToLocationWithRestorationIdentifierAndDirection(this.location, restorationIdentifier, direction);
          this.currentIndex = restorationIndex;
        }
      }
    }

    onPageLoad = async (_event) => {
      await nextMicrotask();
      this.pageLoaded = true;
    }

    // Private

    shouldHandlePopState() {
      // Safari dispatches a popstate event after window's load event, ignore it
      return this.pageIsLoaded()
    }

    pageIsLoaded() {
      return this.pageLoaded || document.readyState == "complete"
    }
  }

  class LinkPrefetchObserver {
    started = false
    #prefetchedLink = null

    constructor(delegate, eventTarget) {
      this.delegate = delegate;
      this.eventTarget = eventTarget;
    }

    start() {
      if (this.started) return

      if (this.eventTarget.readyState === "loading") {
        this.eventTarget.addEventListener("DOMContentLoaded", this.#enable, { once: true });
      } else {
        this.#enable();
      }
    }

    stop() {
      if (!this.started) return

      this.eventTarget.removeEventListener("mouseenter", this.#tryToPrefetchRequest, {
        capture: true,
        passive: true
      });
      this.eventTarget.removeEventListener("mouseleave", this.#cancelRequestIfObsolete, {
        capture: true,
        passive: true
      });

      this.eventTarget.removeEventListener("turbo:before-fetch-request", this.#tryToUsePrefetchedRequest, true);
      this.started = false;
    }

    #enable = () => {
      this.eventTarget.addEventListener("mouseenter", this.#tryToPrefetchRequest, {
        capture: true,
        passive: true
      });
      this.eventTarget.addEventListener("mouseleave", this.#cancelRequestIfObsolete, {
        capture: true,
        passive: true
      });

      this.eventTarget.addEventListener("turbo:before-fetch-request", this.#tryToUsePrefetchedRequest, true);
      this.started = true;
    }

    #tryToPrefetchRequest = (event) => {
      if (getMetaContent("turbo-prefetch") === "false") return

      const target = event.target;
      const isLink = target.matches && target.matches("a[href]:not([target^=_]):not([download])");

      if (isLink && this.#isPrefetchable(target)) {
        const link = target;
        const location = getLocationForLink(link);

        if (this.delegate.canPrefetchRequestToLocation(link, location)) {
          this.#prefetchedLink = link;

          const fetchRequest = new FetchRequest(
            this,
            FetchMethod.get,
            location,
            new URLSearchParams(),
            target
          );

          prefetchCache.setLater(location.toString(), fetchRequest, this.#cacheTtl);
        }
      }
    }

    #cancelRequestIfObsolete = (event) => {
      if (event.target === this.#prefetchedLink) this.#cancelPrefetchRequest();
    }

    #cancelPrefetchRequest = () => {
      prefetchCache.clear();
      this.#prefetchedLink = null;
    }

    #tryToUsePrefetchedRequest = (event) => {
      if (event.target.tagName !== "FORM" && event.detail.fetchOptions.method === "GET") {
        const cached = prefetchCache.get(event.detail.url.toString());

        if (cached) {
          // User clicked link, use cache response
          event.detail.fetchRequest = cached;
        }

        prefetchCache.clear();
      }
    }

    prepareRequest(request) {
      const link = request.target;

      request.headers["X-Sec-Purpose"] = "prefetch";

      const turboFrame = link.closest("turbo-frame");
      const turboFrameTarget = link.getAttribute("data-turbo-frame") || turboFrame?.getAttribute("target") || turboFrame?.id;

      if (turboFrameTarget && turboFrameTarget !== "_top") {
        request.headers["Turbo-Frame"] = turboFrameTarget;
      }
    }

    // Fetch request interface

    requestSucceededWithResponse() {}

    requestStarted(fetchRequest) {}

    requestErrored(fetchRequest) {}

    requestFinished(fetchRequest) {}

    requestPreventedHandlingResponse(fetchRequest, fetchResponse) {}

    requestFailedWithResponse(fetchRequest, fetchResponse) {}

    get #cacheTtl() {
      return Number(getMetaContent("turbo-prefetch-cache-time")) || cacheTtl
    }

    #isPrefetchable(link) {
      const href = link.getAttribute("href");

      if (!href) return false

      if (unfetchableLink(link)) return false
      if (linkToTheSamePage(link)) return false
      if (linkOptsOut(link)) return false
      if (nonSafeLink(link)) return false
      if (eventPrevented(link)) return false

      return true
    }
  }

  const unfetchableLink = (link) => {
    return link.origin !== document.location.origin || !["http:", "https:"].includes(link.protocol) || link.hasAttribute("target")
  };

  const linkToTheSamePage = (link) => {
    return (link.pathname + link.search === document.location.pathname + document.location.search) || link.href.startsWith("#")
  };

  const linkOptsOut = (link) => {
    if (link.getAttribute("data-turbo-prefetch") === "false") return true
    if (link.getAttribute("data-turbo") === "false") return true

    const turboPrefetchParent = findClosestRecursively(link, "[data-turbo-prefetch]");
    if (turboPrefetchParent && turboPrefetchParent.getAttribute("data-turbo-prefetch") === "false") return true

    return false
  };

  const nonSafeLink = (link) => {
    const turboMethod = link.getAttribute("data-turbo-method");
    if (turboMethod && turboMethod.toLowerCase() !== "get") return true

    if (isUJS(link)) return true
    if (link.hasAttribute("data-turbo-confirm")) return true
    if (link.hasAttribute("data-turbo-stream")) return true

    return false
  };

  const isUJS = (link) => {
    return link.hasAttribute("data-remote") || link.hasAttribute("data-behavior") || link.hasAttribute("data-confirm") || link.hasAttribute("data-method")
  };

  const eventPrevented = (link) => {
    const event = dispatch("turbo:before-prefetch", { target: link, cancelable: true });
    return event.defaultPrevented
  };

  class Navigator {
    constructor(delegate) {
      this.delegate = delegate;
    }

    proposeVisit(location, options = {}) {
      if (this.delegate.allowsVisitingLocationWithAction(location, options.action)) {
        this.delegate.visitProposedToLocation(location, options);
      }
    }

    startVisit(locatable, restorationIdentifier, options = {}) {
      this.stop();
      this.currentVisit = new Visit(this, expandURL(locatable), restorationIdentifier, {
        referrer: this.location,
        ...options
      });
      this.currentVisit.start();
    }

    submitForm(form, submitter) {
      this.stop();
      this.formSubmission = new FormSubmission(this, form, submitter, true);

      this.formSubmission.start();
    }

    stop() {
      if (this.formSubmission) {
        this.formSubmission.stop();
        delete this.formSubmission;
      }

      if (this.currentVisit) {
        this.currentVisit.cancel();
        delete this.currentVisit;
      }
    }

    get adapter() {
      return this.delegate.adapter
    }

    get view() {
      return this.delegate.view
    }

    get rootLocation() {
      return this.view.snapshot.rootLocation
    }

    get history() {
      return this.delegate.history
    }

    // Form submission delegate

    formSubmissionStarted(formSubmission) {
      // Not all adapters implement formSubmissionStarted
      if (typeof this.adapter.formSubmissionStarted === "function") {
        this.adapter.formSubmissionStarted(formSubmission);
      }
    }

    async formSubmissionSucceededWithResponse(formSubmission, fetchResponse) {
      if (formSubmission == this.formSubmission) {
        const responseHTML = await fetchResponse.responseHTML;
        if (responseHTML) {
          const shouldCacheSnapshot = formSubmission.isSafe;
          if (!shouldCacheSnapshot) {
            this.view.clearSnapshotCache();
          }

          const { statusCode, redirected } = fetchResponse;
          const action = this.#getActionForFormSubmission(formSubmission, fetchResponse);
          const visitOptions = {
            action,
            shouldCacheSnapshot,
            response: { statusCode, responseHTML, redirected }
          };
          this.proposeVisit(fetchResponse.location, visitOptions);
        }
      }
    }

    async formSubmissionFailedWithResponse(formSubmission, fetchResponse) {
      const responseHTML = await fetchResponse.responseHTML;

      if (responseHTML) {
        const snapshot = PageSnapshot.fromHTMLString(responseHTML);
        if (fetchResponse.serverError) {
          await this.view.renderError(snapshot, this.currentVisit);
        } else {
          await this.view.renderPage(snapshot, false, true, this.currentVisit);
        }
        if(!snapshot.shouldPreserveScrollPosition) {
          this.view.scrollToTop();
        }
        this.view.clearSnapshotCache();
      }
    }

    formSubmissionErrored(formSubmission, error) {
      console.error(error);
    }

    formSubmissionFinished(formSubmission) {
      // Not all adapters implement formSubmissionFinished
      if (typeof this.adapter.formSubmissionFinished === "function") {
        this.adapter.formSubmissionFinished(formSubmission);
      }
    }

    // Visit delegate

    visitStarted(visit) {
      this.delegate.visitStarted(visit);
    }

    visitCompleted(visit) {
      this.delegate.visitCompleted(visit);
      delete this.currentVisit;
    }

    locationWithActionIsSamePage(location, action) {
      const anchor = getAnchor(location);
      const currentAnchor = getAnchor(this.view.lastRenderedLocation);
      const isRestorationToTop = action === "restore" && typeof anchor === "undefined";

      return (
        action !== "replace" &&
        getRequestURL(location) === getRequestURL(this.view.lastRenderedLocation) &&
        (isRestorationToTop || (anchor != null && anchor !== currentAnchor))
      )
    }

    visitScrolledToSamePageLocation(oldURL, newURL) {
      this.delegate.visitScrolledToSamePageLocation(oldURL, newURL);
    }

    // Visits

    get location() {
      return this.history.location
    }

    get restorationIdentifier() {
      return this.history.restorationIdentifier
    }

    #getActionForFormSubmission(formSubmission, fetchResponse) {
      const { submitter, formElement } = formSubmission;
      return getVisitAction(submitter, formElement) || this.#getDefaultAction(fetchResponse)
    }

    #getDefaultAction(fetchResponse) {
      const sameLocationRedirect = fetchResponse.redirected && fetchResponse.location.href === this.location?.href;
      return sameLocationRedirect ? "replace" : "advance"
    }
  }

  const PageStage = {
    initial: 0,
    loading: 1,
    interactive: 2,
    complete: 3
  };

  class PageObserver {
    stage = PageStage.initial
    started = false

    constructor(delegate) {
      this.delegate = delegate;
    }

    start() {
      if (!this.started) {
        if (this.stage == PageStage.initial) {
          this.stage = PageStage.loading;
        }
        document.addEventListener("readystatechange", this.interpretReadyState, false);
        addEventListener("pagehide", this.pageWillUnload, false);
        this.started = true;
      }
    }

    stop() {
      if (this.started) {
        document.removeEventListener("readystatechange", this.interpretReadyState, false);
        removeEventListener("pagehide", this.pageWillUnload, false);
        this.started = false;
      }
    }

    interpretReadyState = () => {
      const { readyState } = this;
      if (readyState == "interactive") {
        this.pageIsInteractive();
      } else if (readyState == "complete") {
        this.pageIsComplete();
      }
    }

    pageIsInteractive() {
      if (this.stage == PageStage.loading) {
        this.stage = PageStage.interactive;
        this.delegate.pageBecameInteractive();
      }
    }

    pageIsComplete() {
      this.pageIsInteractive();
      if (this.stage == PageStage.interactive) {
        this.stage = PageStage.complete;
        this.delegate.pageLoaded();
      }
    }

    pageWillUnload = () => {
      this.delegate.pageWillUnload();
    }

    get readyState() {
      return document.readyState
    }
  }

  class ScrollObserver {
    started = false

    constructor(delegate) {
      this.delegate = delegate;
    }

    start() {
      if (!this.started) {
        addEventListener("scroll", this.onScroll, false);
        this.onScroll();
        this.started = true;
      }
    }

    stop() {
      if (this.started) {
        removeEventListener("scroll", this.onScroll, false);
        this.started = false;
      }
    }

    onScroll = () => {
      this.updatePosition({ x: window.pageXOffset, y: window.pageYOffset });
    }

    // Private

    updatePosition(position) {
      this.delegate.scrollPositionChanged(position);
    }
  }

  class StreamMessageRenderer {
    render({ fragment }) {
      Bardo.preservingPermanentElements(this, getPermanentElementMapForFragment(fragment), () => {
        withAutofocusFromFragment(fragment, () => {
          withPreservedFocus(() => {
            document.documentElement.appendChild(fragment);
          });
        });
      });
    }

    // Bardo delegate

    enteringBardo(currentPermanentElement, newPermanentElement) {
      newPermanentElement.replaceWith(currentPermanentElement.cloneNode(true));
    }

    leavingBardo() {}
  }

  function getPermanentElementMapForFragment(fragment) {
    const permanentElementsInDocument = queryPermanentElementsAll(document.documentElement);
    const permanentElementMap = {};
    for (const permanentElementInDocument of permanentElementsInDocument) {
      const { id } = permanentElementInDocument;

      for (const streamElement of fragment.querySelectorAll("turbo-stream")) {
        const elementInStream = getPermanentElementById(streamElement.templateElement.content, id);

        if (elementInStream) {
          permanentElementMap[id] = [permanentElementInDocument, elementInStream];
        }
      }
    }

    return permanentElementMap
  }

  async function withAutofocusFromFragment(fragment, callback) {
    const generatedID = `turbo-stream-autofocus-${uuid()}`;
    const turboStreams = fragment.querySelectorAll("turbo-stream");
    const elementWithAutofocus = firstAutofocusableElementInStreams(turboStreams);
    let willAutofocusId = null;

    if (elementWithAutofocus) {
      if (elementWithAutofocus.id) {
        willAutofocusId = elementWithAutofocus.id;
      } else {
        willAutofocusId = generatedID;
      }

      elementWithAutofocus.id = willAutofocusId;
    }

    callback();
    await nextRepaint();

    const hasNoActiveElement = document.activeElement == null || document.activeElement == document.body;

    if (hasNoActiveElement && willAutofocusId) {
      const elementToAutofocus = document.getElementById(willAutofocusId);

      if (elementIsFocusable(elementToAutofocus)) {
        elementToAutofocus.focus();
      }
      if (elementToAutofocus && elementToAutofocus.id == generatedID) {
        elementToAutofocus.removeAttribute("id");
      }
    }
  }

  async function withPreservedFocus(callback) {
    const [activeElementBeforeRender, activeElementAfterRender] = await around(callback, () => document.activeElement);

    const restoreFocusTo = activeElementBeforeRender && activeElementBeforeRender.id;

    if (restoreFocusTo) {
      const elementToFocus = document.getElementById(restoreFocusTo);

      if (elementIsFocusable(elementToFocus) && elementToFocus != activeElementAfterRender) {
        elementToFocus.focus();
      }
    }
  }

  function firstAutofocusableElementInStreams(nodeListOfStreamElements) {
    for (const streamElement of nodeListOfStreamElements) {
      const elementWithAutofocus = queryAutofocusableElement(streamElement.templateElement.content);

      if (elementWithAutofocus) return elementWithAutofocus
    }

    return null
  }

  class StreamObserver {
    sources = new Set()
    #started = false

    constructor(delegate) {
      this.delegate = delegate;
    }

    start() {
      if (!this.#started) {
        this.#started = true;
        addEventListener("turbo:before-fetch-response", this.inspectFetchResponse, false);
      }
    }

    stop() {
      if (this.#started) {
        this.#started = false;
        removeEventListener("turbo:before-fetch-response", this.inspectFetchResponse, false);
      }
    }

    connectStreamSource(source) {
      if (!this.streamSourceIsConnected(source)) {
        this.sources.add(source);
        source.addEventListener("message", this.receiveMessageEvent, false);
      }
    }

    disconnectStreamSource(source) {
      if (this.streamSourceIsConnected(source)) {
        this.sources.delete(source);
        source.removeEventListener("message", this.receiveMessageEvent, false);
      }
    }

    streamSourceIsConnected(source) {
      return this.sources.has(source)
    }

    inspectFetchResponse = (event) => {
      const response = fetchResponseFromEvent(event);
      if (response && fetchResponseIsStream(response)) {
        event.preventDefault();
        this.receiveMessageResponse(response);
      }
    }

    receiveMessageEvent = (event) => {
      if (this.#started && typeof event.data == "string") {
        this.receiveMessageHTML(event.data);
      }
    }

    async receiveMessageResponse(response) {
      const html = await response.responseHTML;
      if (html) {
        this.receiveMessageHTML(html);
      }
    }

    receiveMessageHTML(html) {
      this.delegate.receivedMessageFromStream(StreamMessage.wrap(html));
    }
  }

  function fetchResponseFromEvent(event) {
    const fetchResponse = event.detail?.fetchResponse;
    if (fetchResponse instanceof FetchResponse) {
      return fetchResponse
    }
  }

  function fetchResponseIsStream(response) {
    const contentType = response.contentType ?? "";
    return contentType.startsWith(StreamMessage.contentType)
  }

  class ErrorRenderer extends Renderer {
    static renderElement(currentElement, newElement) {
      const { documentElement, body } = document;

      documentElement.replaceChild(newElement, body);
    }

    async render() {
      this.replaceHeadAndBody();
      this.activateScriptElements();
    }

    replaceHeadAndBody() {
      const { documentElement, head } = document;
      documentElement.replaceChild(this.newHead, head);
      this.renderElement(this.currentElement, this.newElement);
    }

    activateScriptElements() {
      for (const replaceableElement of this.scriptElements) {
        const parentNode = replaceableElement.parentNode;
        if (parentNode) {
          const element = activateScriptElement(replaceableElement);
          parentNode.replaceChild(element, replaceableElement);
        }
      }
    }

    get newHead() {
      return this.newSnapshot.headSnapshot.element
    }

    get scriptElements() {
      return document.documentElement.querySelectorAll("script")
    }
  }

  class PageRenderer extends Renderer {
    static renderElement(currentElement, newElement) {
      if (document.body && newElement instanceof HTMLBodyElement) {
        document.body.replaceWith(newElement);
      } else {
        document.documentElement.appendChild(newElement);
      }
    }

    get shouldRender() {
      return this.newSnapshot.isVisitable && this.trackedElementsAreIdentical
    }

    get reloadReason() {
      if (!this.newSnapshot.isVisitable) {
        return {
          reason: "turbo_visit_control_is_reload"
        }
      }

      if (!this.trackedElementsAreIdentical) {
        return {
          reason: "tracked_element_mismatch"
        }
      }
    }

    async prepareToRender() {
      this.#setLanguage();
      await this.mergeHead();
    }

    async render() {
      if (this.willRender) {
        await this.replaceBody();
      }
    }

    finishRendering() {
      super.finishRendering();
      if (!this.isPreview) {
        this.focusFirstAutofocusableElement();
      }
    }

    get currentHeadSnapshot() {
      return this.currentSnapshot.headSnapshot
    }

    get newHeadSnapshot() {
      return this.newSnapshot.headSnapshot
    }

    get newElement() {
      return this.newSnapshot.element
    }

    #setLanguage() {
      const { documentElement } = this.currentSnapshot;
      const { lang } = this.newSnapshot;

      if (lang) {
        documentElement.setAttribute("lang", lang);
      } else {
        documentElement.removeAttribute("lang");
      }
    }

    async mergeHead() {
      const mergedHeadElements = this.mergeProvisionalElements();
      const newStylesheetElements = this.copyNewHeadStylesheetElements();
      this.copyNewHeadScriptElements();

      await mergedHeadElements;
      await newStylesheetElements;

      if (this.willRender) {
        this.removeUnusedDynamicStylesheetElements();
      }
    }

    async replaceBody() {
      await this.preservingPermanentElements(async () => {
        this.activateNewBody();
        await this.assignNewBody();
      });
    }

    get trackedElementsAreIdentical() {
      return this.currentHeadSnapshot.trackedElementSignature == this.newHeadSnapshot.trackedElementSignature
    }

    async copyNewHeadStylesheetElements() {
      const loadingElements = [];

      for (const element of this.newHeadStylesheetElements) {
        loadingElements.push(waitForLoad(element));

        document.head.appendChild(element);
      }

      await Promise.all(loadingElements);
    }

    copyNewHeadScriptElements() {
      for (const element of this.newHeadScriptElements) {
        document.head.appendChild(activateScriptElement(element));
      }
    }

    removeUnusedDynamicStylesheetElements() {
      for (const element of this.unusedDynamicStylesheetElements) {
        document.head.removeChild(element);
      }
    }

    async mergeProvisionalElements() {
      const newHeadElements = [...this.newHeadProvisionalElements];

      for (const element of this.currentHeadProvisionalElements) {
        if (!this.isCurrentElementInElementList(element, newHeadElements)) {
          document.head.removeChild(element);
        }
      }

      for (const element of newHeadElements) {
        document.head.appendChild(element);
      }
    }

    isCurrentElementInElementList(element, elementList) {
      for (const [index, newElement] of elementList.entries()) {
        // if title element...
        if (element.tagName == "TITLE") {
          if (newElement.tagName != "TITLE") {
            continue
          }
          if (element.innerHTML == newElement.innerHTML) {
            elementList.splice(index, 1);
            return true
          }
        }

        // if any other element...
        if (newElement.isEqualNode(element)) {
          elementList.splice(index, 1);
          return true
        }
      }

      return false
    }

    removeCurrentHeadProvisionalElements() {
      for (const element of this.currentHeadProvisionalElements) {
        document.head.removeChild(element);
      }
    }

    copyNewHeadProvisionalElements() {
      for (const element of this.newHeadProvisionalElements) {
        document.head.appendChild(element);
      }
    }

    activateNewBody() {
      document.adoptNode(this.newElement);
      this.activateNewBodyScriptElements();
    }

    activateNewBodyScriptElements() {
      for (const inertScriptElement of this.newBodyScriptElements) {
        const activatedScriptElement = activateScriptElement(inertScriptElement);
        inertScriptElement.replaceWith(activatedScriptElement);
      }
    }

    async assignNewBody() {
      await this.renderElement(this.currentElement, this.newElement);
    }

    get unusedDynamicStylesheetElements() {
      return this.oldHeadStylesheetElements.filter((element) => {
        return element.getAttribute("data-turbo-track") === "dynamic"
      })
    }

    get oldHeadStylesheetElements() {
      return this.currentHeadSnapshot.getStylesheetElementsNotInSnapshot(this.newHeadSnapshot)
    }

    get newHeadStylesheetElements() {
      return this.newHeadSnapshot.getStylesheetElementsNotInSnapshot(this.currentHeadSnapshot)
    }

    get newHeadScriptElements() {
      return this.newHeadSnapshot.getScriptElementsNotInSnapshot(this.currentHeadSnapshot)
    }

    get currentHeadProvisionalElements() {
      return this.currentHeadSnapshot.provisionalElements
    }

    get newHeadProvisionalElements() {
      return this.newHeadSnapshot.provisionalElements
    }

    get newBodyScriptElements() {
      return this.newElement.querySelectorAll("script")
    }
  }

  class MorphingPageRenderer extends PageRenderer {
    static renderElement(currentElement, newElement) {
      morphElements(currentElement, newElement, {
        callbacks: {
          beforeNodeMorphed: element => !canRefreshFrame(element)
        }
      });

      for (const frame of currentElement.querySelectorAll("turbo-frame")) {
        if (canRefreshFrame(frame)) frame.reload();
      }

      dispatch("turbo:morph", { detail: { currentElement, newElement } });
    }

    async preservingPermanentElements(callback) {
      return await callback()
    }

    get renderMethod() {
      return "morph"
    }

    get shouldAutofocus() {
      return false
    }
  }

  function canRefreshFrame(frame) {
    return frame instanceof FrameElement &&
      frame.src &&
      frame.refresh === "morph" &&
      !frame.closest("[data-turbo-permanent]")
  }

  class SnapshotCache {
    keys = []
    snapshots = {}

    constructor(size) {
      this.size = size;
    }

    has(location) {
      return toCacheKey(location) in this.snapshots
    }

    get(location) {
      if (this.has(location)) {
        const snapshot = this.read(location);
        this.touch(location);
        return snapshot
      }
    }

    put(location, snapshot) {
      this.write(location, snapshot);
      this.touch(location);
      return snapshot
    }

    clear() {
      this.snapshots = {};
    }

    // Private

    read(location) {
      return this.snapshots[toCacheKey(location)]
    }

    write(location, snapshot) {
      this.snapshots[toCacheKey(location)] = snapshot;
    }

    touch(location) {
      const key = toCacheKey(location);
      const index = this.keys.indexOf(key);
      if (index > -1) this.keys.splice(index, 1);
      this.keys.unshift(key);
      this.trim();
    }

    trim() {
      for (const key of this.keys.splice(this.size)) {
        delete this.snapshots[key];
      }
    }
  }

  class PageView extends View {
    snapshotCache = new SnapshotCache(10)
    lastRenderedLocation = new URL(location.href)
    forceReloaded = false

    shouldTransitionTo(newSnapshot) {
      return this.snapshot.prefersViewTransitions && newSnapshot.prefersViewTransitions
    }

    renderPage(snapshot, isPreview = false, willRender = true, visit) {
      const shouldMorphPage = this.isPageRefresh(visit) && this.snapshot.shouldMorphPage;
      const rendererClass = shouldMorphPage ? MorphingPageRenderer : PageRenderer;

      const renderer = new rendererClass(this.snapshot, snapshot, isPreview, willRender);

      if (!renderer.shouldRender) {
        this.forceReloaded = true;
      } else {
        visit?.changeHistory();
      }

      return this.render(renderer)
    }

    renderError(snapshot, visit) {
      visit?.changeHistory();
      const renderer = new ErrorRenderer(this.snapshot, snapshot, false);
      return this.render(renderer)
    }

    clearSnapshotCache() {
      this.snapshotCache.clear();
    }

    async cacheSnapshot(snapshot = this.snapshot) {
      if (snapshot.isCacheable) {
        this.delegate.viewWillCacheSnapshot();
        const { lastRenderedLocation: location } = this;
        await nextEventLoopTick();
        const cachedSnapshot = snapshot.clone();
        this.snapshotCache.put(location, cachedSnapshot);
        return cachedSnapshot
      }
    }

    getCachedSnapshotForLocation(location) {
      return this.snapshotCache.get(location)
    }

    isPageRefresh(visit) {
      return !visit || (this.lastRenderedLocation.pathname === visit.location.pathname && visit.action === "replace")
    }

    shouldPreserveScrollPosition(visit) {
      return this.isPageRefresh(visit) && this.snapshot.shouldPreserveScrollPosition
    }

    get snapshot() {
      return PageSnapshot.fromElement(this.element)
    }
  }

  class Preloader {
    selector = "a[data-turbo-preload]"

    constructor(delegate, snapshotCache) {
      this.delegate = delegate;
      this.snapshotCache = snapshotCache;
    }

    start() {
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", this.#preloadAll);
      } else {
        this.preloadOnLoadLinksForView(document.body);
      }
    }

    stop() {
      document.removeEventListener("DOMContentLoaded", this.#preloadAll);
    }

    preloadOnLoadLinksForView(element) {
      for (const link of element.querySelectorAll(this.selector)) {
        if (this.delegate.shouldPreloadLink(link)) {
          this.preloadURL(link);
        }
      }
    }

    async preloadURL(link) {
      const location = new URL(link.href);

      if (this.snapshotCache.has(location)) {
        return
      }

      const fetchRequest = new FetchRequest(this, FetchMethod.get, location, new URLSearchParams(), link);
      await fetchRequest.perform();
    }

    // Fetch request delegate

    prepareRequest(fetchRequest) {
      fetchRequest.headers["X-Sec-Purpose"] = "prefetch";
    }

    async requestSucceededWithResponse(fetchRequest, fetchResponse) {
      try {
        const responseHTML = await fetchResponse.responseHTML;
        const snapshot = PageSnapshot.fromHTMLString(responseHTML);

        this.snapshotCache.put(fetchRequest.url, snapshot);
      } catch (_) {
        // If we cannot preload that is ok!
      }
    }

    requestStarted(fetchRequest) {}

    requestErrored(fetchRequest) {}

    requestFinished(fetchRequest) {}

    requestPreventedHandlingResponse(fetchRequest, fetchResponse) {}

    requestFailedWithResponse(fetchRequest, fetchResponse) {}

    #preloadAll = () => {
      this.preloadOnLoadLinksForView(document.body);
    }
  }

  class Cache {
    constructor(session) {
      this.session = session;
    }

    clear() {
      this.session.clearCache();
    }

    resetCacheControl() {
      this.#setCacheControl("");
    }

    exemptPageFromCache() {
      this.#setCacheControl("no-cache");
    }

    exemptPageFromPreview() {
      this.#setCacheControl("no-preview");
    }

    #setCacheControl(value) {
      setMetaContent("turbo-cache-control", value);
    }
  }

  class Session {
    navigator = new Navigator(this)
    history = new History(this)
    view = new PageView(this, document.documentElement)
    adapter = new BrowserAdapter(this)

    pageObserver = new PageObserver(this)
    cacheObserver = new CacheObserver()
    linkPrefetchObserver = new LinkPrefetchObserver(this, document)
    linkClickObserver = new LinkClickObserver(this, window)
    formSubmitObserver = new FormSubmitObserver(this, document)
    scrollObserver = new ScrollObserver(this)
    streamObserver = new StreamObserver(this)
    formLinkClickObserver = new FormLinkClickObserver(this, document.documentElement)
    frameRedirector = new FrameRedirector(this, document.documentElement)
    streamMessageRenderer = new StreamMessageRenderer()
    cache = new Cache(this)

    enabled = true
    started = false
    #pageRefreshDebouncePeriod = 150

    constructor(recentRequests) {
      this.recentRequests = recentRequests;
      this.preloader = new Preloader(this, this.view.snapshotCache);
      this.debouncedRefresh = this.refresh;
      this.pageRefreshDebouncePeriod = this.pageRefreshDebouncePeriod;
    }

    start() {
      if (!this.started) {
        this.pageObserver.start();
        this.cacheObserver.start();
        this.linkPrefetchObserver.start();
        this.formLinkClickObserver.start();
        this.linkClickObserver.start();
        this.formSubmitObserver.start();
        this.scrollObserver.start();
        this.streamObserver.start();
        this.frameRedirector.start();
        this.history.start();
        this.preloader.start();
        this.started = true;
        this.enabled = true;
      }
    }

    disable() {
      this.enabled = false;
    }

    stop() {
      if (this.started) {
        this.pageObserver.stop();
        this.cacheObserver.stop();
        this.linkPrefetchObserver.stop();
        this.formLinkClickObserver.stop();
        this.linkClickObserver.stop();
        this.formSubmitObserver.stop();
        this.scrollObserver.stop();
        this.streamObserver.stop();
        this.frameRedirector.stop();
        this.history.stop();
        this.preloader.stop();
        this.started = false;
      }
    }

    registerAdapter(adapter) {
      this.adapter = adapter;
    }

    visit(location, options = {}) {
      const frameElement = options.frame ? document.getElementById(options.frame) : null;

      if (frameElement instanceof FrameElement) {
        const action = options.action || getVisitAction(frameElement);

        frameElement.delegate.proposeVisitIfNavigatedWithAction(frameElement, action);
        frameElement.src = location.toString();
      } else {
        this.navigator.proposeVisit(expandURL(location), options);
      }
    }

    refresh(url, requestId) {
      const isRecentRequest = requestId && this.recentRequests.has(requestId);
      if (!isRecentRequest && !this.navigator.currentVisit) {
        this.visit(url, { action: "replace", shouldCacheSnapshot: false });
      }
    }

    connectStreamSource(source) {
      this.streamObserver.connectStreamSource(source);
    }

    disconnectStreamSource(source) {
      this.streamObserver.disconnectStreamSource(source);
    }

    renderStreamMessage(message) {
      this.streamMessageRenderer.render(StreamMessage.wrap(message));
    }

    clearCache() {
      this.view.clearSnapshotCache();
    }

    setProgressBarDelay(delay) {
      console.warn(
        "Please replace `session.setProgressBarDelay(delay)` with `session.progressBarDelay = delay`. The function is deprecated and will be removed in a future version of Turbo.`"
      );

      this.progressBarDelay = delay;
    }

    set progressBarDelay(delay) {
      config.drive.progressBarDelay = delay;
    }

    get progressBarDelay() {
      return config.drive.progressBarDelay
    }

    set drive(value) {
      config.drive.enabled = value;
    }

    get drive() {
      return config.drive.enabled
    }

    set formMode(value) {
      config.forms.mode = value;
    }

    get formMode() {
      return config.forms.mode
    }

    get location() {
      return this.history.location
    }

    get restorationIdentifier() {
      return this.history.restorationIdentifier
    }

    get pageRefreshDebouncePeriod() {
      return this.#pageRefreshDebouncePeriod
    }

    set pageRefreshDebouncePeriod(value) {
      this.refresh = debounce(this.debouncedRefresh.bind(this), value);
      this.#pageRefreshDebouncePeriod = value;
    }

    // Preloader delegate

    shouldPreloadLink(element) {
      const isUnsafe = element.hasAttribute("data-turbo-method");
      const isStream = element.hasAttribute("data-turbo-stream");
      const frameTarget = element.getAttribute("data-turbo-frame");
      const frame = frameTarget == "_top" ?
        null :
        document.getElementById(frameTarget) || findClosestRecursively(element, "turbo-frame:not([disabled])");

      if (isUnsafe || isStream || frame instanceof FrameElement) {
        return false
      } else {
        const location = new URL(element.href);

        return this.elementIsNavigatable(element) && locationIsVisitable(location, this.snapshot.rootLocation)
      }
    }

    // History delegate

    historyPoppedToLocationWithRestorationIdentifierAndDirection(location, restorationIdentifier, direction) {
      if (this.enabled) {
        this.navigator.startVisit(location, restorationIdentifier, {
          action: "restore",
          historyChanged: true,
          direction
        });
      } else {
        this.adapter.pageInvalidated({
          reason: "turbo_disabled"
        });
      }
    }

    // Scroll observer delegate

    scrollPositionChanged(position) {
      this.history.updateRestorationData({ scrollPosition: position });
    }

    // Form click observer delegate

    willSubmitFormLinkToLocation(link, location) {
      return this.elementIsNavigatable(link) && locationIsVisitable(location, this.snapshot.rootLocation)
    }

    submittedFormLinkToLocation() {}

    // Link hover observer delegate

    canPrefetchRequestToLocation(link, location) {
      return (
        this.elementIsNavigatable(link) &&
          locationIsVisitable(location, this.snapshot.rootLocation)
      )
    }

    // Link click observer delegate

    willFollowLinkToLocation(link, location, event) {
      return (
        this.elementIsNavigatable(link) &&
        locationIsVisitable(location, this.snapshot.rootLocation) &&
        this.applicationAllowsFollowingLinkToLocation(link, location, event)
      )
    }

    followedLinkToLocation(link, location) {
      const action = this.getActionForLink(link);
      const acceptsStreamResponse = link.hasAttribute("data-turbo-stream");

      this.visit(location.href, { action, acceptsStreamResponse });
    }

    // Navigator delegate

    allowsVisitingLocationWithAction(location, action) {
      return this.locationWithActionIsSamePage(location, action) || this.applicationAllowsVisitingLocation(location)
    }

    visitProposedToLocation(location, options) {
      extendURLWithDeprecatedProperties(location);
      this.adapter.visitProposedToLocation(location, options);
    }

    // Visit delegate

    visitStarted(visit) {
      if (!visit.acceptsStreamResponse) {
        markAsBusy(document.documentElement);
        this.view.markVisitDirection(visit.direction);
      }
      extendURLWithDeprecatedProperties(visit.location);
      if (!visit.silent) {
        this.notifyApplicationAfterVisitingLocation(visit.location, visit.action);
      }
    }

    visitCompleted(visit) {
      this.view.unmarkVisitDirection();
      clearBusyState(document.documentElement);
      this.notifyApplicationAfterPageLoad(visit.getTimingMetrics());
    }

    locationWithActionIsSamePage(location, action) {
      return this.navigator.locationWithActionIsSamePage(location, action)
    }

    visitScrolledToSamePageLocation(oldURL, newURL) {
      this.notifyApplicationAfterVisitingSamePageLocation(oldURL, newURL);
    }

    // Form submit observer delegate

    willSubmitForm(form, submitter) {
      const action = getAction$1(form, submitter);

      return (
        this.submissionIsNavigatable(form, submitter) &&
        locationIsVisitable(expandURL(action), this.snapshot.rootLocation)
      )
    }

    formSubmitted(form, submitter) {
      this.navigator.submitForm(form, submitter);
    }

    // Page observer delegate

    pageBecameInteractive() {
      this.view.lastRenderedLocation = this.location;
      this.notifyApplicationAfterPageLoad();
    }

    pageLoaded() {
      this.history.assumeControlOfScrollRestoration();
    }

    pageWillUnload() {
      this.history.relinquishControlOfScrollRestoration();
    }

    // Stream observer delegate

    receivedMessageFromStream(message) {
      this.renderStreamMessage(message);
    }

    // Page view delegate

    viewWillCacheSnapshot() {
      if (!this.navigator.currentVisit?.silent) {
        this.notifyApplicationBeforeCachingSnapshot();
      }
    }

    allowsImmediateRender({ element }, options) {
      const event = this.notifyApplicationBeforeRender(element, options);
      const {
        defaultPrevented,
        detail: { render }
      } = event;

      if (this.view.renderer && render) {
        this.view.renderer.renderElement = render;
      }

      return !defaultPrevented
    }

    viewRenderedSnapshot(_snapshot, _isPreview, renderMethod) {
      this.view.lastRenderedLocation = this.history.location;
      this.notifyApplicationAfterRender(renderMethod);
    }

    preloadOnLoadLinksForView(element) {
      this.preloader.preloadOnLoadLinksForView(element);
    }

    viewInvalidated(reason) {
      this.adapter.pageInvalidated(reason);
    }

    // Frame element

    frameLoaded(frame) {
      this.notifyApplicationAfterFrameLoad(frame);
    }

    frameRendered(fetchResponse, frame) {
      this.notifyApplicationAfterFrameRender(fetchResponse, frame);
    }

    // Application events

    applicationAllowsFollowingLinkToLocation(link, location, ev) {
      const event = this.notifyApplicationAfterClickingLinkToLocation(link, location, ev);
      return !event.defaultPrevented
    }

    applicationAllowsVisitingLocation(location) {
      const event = this.notifyApplicationBeforeVisitingLocation(location);
      return !event.defaultPrevented
    }

    notifyApplicationAfterClickingLinkToLocation(link, location, event) {
      return dispatch("turbo:click", {
        target: link,
        detail: { url: location.href, originalEvent: event },
        cancelable: true
      })
    }

    notifyApplicationBeforeVisitingLocation(location) {
      return dispatch("turbo:before-visit", {
        detail: { url: location.href },
        cancelable: true
      })
    }

    notifyApplicationAfterVisitingLocation(location, action) {
      return dispatch("turbo:visit", { detail: { url: location.href, action } })
    }

    notifyApplicationBeforeCachingSnapshot() {
      return dispatch("turbo:before-cache")
    }

    notifyApplicationBeforeRender(newBody, options) {
      return dispatch("turbo:before-render", {
        detail: { newBody, ...options },
        cancelable: true
      })
    }

    notifyApplicationAfterRender(renderMethod) {
      return dispatch("turbo:render", { detail: { renderMethod } })
    }

    notifyApplicationAfterPageLoad(timing = {}) {
      return dispatch("turbo:load", {
        detail: { url: this.location.href, timing }
      })
    }

    notifyApplicationAfterVisitingSamePageLocation(oldURL, newURL) {
      dispatchEvent(
        new HashChangeEvent("hashchange", {
          oldURL: oldURL.toString(),
          newURL: newURL.toString()
        })
      );
    }

    notifyApplicationAfterFrameLoad(frame) {
      return dispatch("turbo:frame-load", { target: frame })
    }

    notifyApplicationAfterFrameRender(fetchResponse, frame) {
      return dispatch("turbo:frame-render", {
        detail: { fetchResponse },
        target: frame,
        cancelable: true
      })
    }

    // Helpers

    submissionIsNavigatable(form, submitter) {
      if (config.forms.mode == "off") {
        return false
      } else {
        const submitterIsNavigatable = submitter ? this.elementIsNavigatable(submitter) : true;

        if (config.forms.mode == "optin") {
          return submitterIsNavigatable && form.closest('[data-turbo="true"]') != null
        } else {
          return submitterIsNavigatable && this.elementIsNavigatable(form)
        }
      }
    }

    elementIsNavigatable(element) {
      const container = findClosestRecursively(element, "[data-turbo]");
      const withinFrame = findClosestRecursively(element, "turbo-frame");

      // Check if Drive is enabled on the session or we're within a Frame.
      if (config.drive.enabled || withinFrame) {
        // Element is navigatable by default, unless `data-turbo="false"`.
        if (container) {
          return container.getAttribute("data-turbo") != "false"
        } else {
          return true
        }
      } else {
        // Element isn't navigatable by default, unless `data-turbo="true"`.
        if (container) {
          return container.getAttribute("data-turbo") == "true"
        } else {
          return false
        }
      }
    }

    // Private

    getActionForLink(link) {
      return getVisitAction(link) || "advance"
    }

    get snapshot() {
      return this.view.snapshot
    }
  }

  // Older versions of the Turbo Native adapters referenced the
  // `Location#absoluteURL` property in their implementations of
  // the `Adapter#visitProposedToLocation()` and `#visitStarted()`
  // methods. The Location class has since been removed in favor
  // of the DOM URL API, and accordingly all Adapter methods now
  // receive URL objects.
  //
  // We alias #absoluteURL to #toString() here to avoid crashing
  // older adapters which do not expect URL objects. We should
  // consider removing this support at some point in the future.

  function extendURLWithDeprecatedProperties(url) {
    Object.defineProperties(url, deprecatedLocationPropertyDescriptors);
  }

  const deprecatedLocationPropertyDescriptors = {
    absoluteURL: {
      get() {
        return this.toString()
      }
    }
  };

  const session = new Session(recentRequests);
  const { cache, navigator: navigator$1 } = session;

  /**
   * Starts the main session.
   * This initialises any necessary observers such as those to monitor
   * link interactions.
   */
  function start() {
    session.start();
  }

  /**
   * Registers an adapter for the main session.
   *
   * @param adapter Adapter to register
   */
  function registerAdapter(adapter) {
    session.registerAdapter(adapter);
  }

  /**
   * Performs an application visit to the given location.
   *
   * @param location Location to visit (a URL or path)
   * @param options Options to apply
   * @param options.action Type of history navigation to apply ("restore",
   * "replace" or "advance")
   * @param options.historyChanged Specifies whether the browser history has
   * already been changed for this visit or not
   * @param options.referrer Specifies the referrer of this visit such that
   * navigations to the same page will not result in a new history entry.
   * @param options.snapshotHTML Cached snapshot to render
   * @param options.response Response of the specified location
   */
  function visit(location, options) {
    session.visit(location, options);
  }

  /**
   * Connects a stream source to the main session.
   *
   * @param source Stream source to connect
   */
  function connectStreamSource(source) {
    session.connectStreamSource(source);
  }

  /**
   * Disconnects a stream source from the main session.
   *
   * @param source Stream source to disconnect
   */
  function disconnectStreamSource(source) {
    session.disconnectStreamSource(source);
  }

  /**
   * Renders a stream message to the main session by appending it to the
   * current document.
   *
   * @param message Message to render
   */
  function renderStreamMessage(message) {
    session.renderStreamMessage(message);
  }

  /**
   * Removes all entries from the Turbo Drive page cache.
   * Call this when state has changed on the server that may affect cached pages.
   *
   * @deprecated since version 7.2.0 in favor of `Turbo.cache.clear()`
   */
  function clearCache() {
    console.warn(
      "Please replace `Turbo.clearCache()` with `Turbo.cache.clear()`. The top-level function is deprecated and will be removed in a future version of Turbo.`"
    );
    session.clearCache();
  }

  /**
   * Sets the delay after which the progress bar will appear during navigation.
   *
   * The progress bar appears after 500ms by default.
   *
   * Note that this method has no effect when used with the iOS or Android
   * adapters.
   *
   * @param delay Time to delay in milliseconds
   */
  function setProgressBarDelay(delay) {
    console.warn(
      "Please replace `Turbo.setProgressBarDelay(delay)` with `Turbo.config.drive.progressBarDelay = delay`. The top-level function is deprecated and will be removed in a future version of Turbo.`"
    );
    config.drive.progressBarDelay = delay;
  }

  function setConfirmMethod(confirmMethod) {
    console.warn(
      "Please replace `Turbo.setConfirmMethod(confirmMethod)` with `Turbo.config.forms.confirm = confirmMethod`. The top-level function is deprecated and will be removed in a future version of Turbo.`"
    );
    config.forms.confirm = confirmMethod;
  }

  function setFormMode(mode) {
    console.warn(
      "Please replace `Turbo.setFormMode(mode)` with `Turbo.config.forms.mode = mode`. The top-level function is deprecated and will be removed in a future version of Turbo.`"
    );
    config.forms.mode = mode;
  }

  var Turbo = /*#__PURE__*/Object.freeze({
    __proto__: null,
    navigator: navigator$1,
    session: session,
    cache: cache,
    PageRenderer: PageRenderer,
    PageSnapshot: PageSnapshot,
    FrameRenderer: FrameRenderer,
    fetch: fetchWithTurboHeaders,
    config: config,
    start: start,
    registerAdapter: registerAdapter,
    visit: visit,
    connectStreamSource: connectStreamSource,
    disconnectStreamSource: disconnectStreamSource,
    renderStreamMessage: renderStreamMessage,
    clearCache: clearCache,
    setProgressBarDelay: setProgressBarDelay,
    setConfirmMethod: setConfirmMethod,
    setFormMode: setFormMode
  });

  class TurboFrameMissingError extends Error {}

  class FrameController {
    fetchResponseLoaded = (_fetchResponse) => Promise.resolve()
    #currentFetchRequest = null
    #resolveVisitPromise = () => {}
    #connected = false
    #hasBeenLoaded = false
    #ignoredAttributes = new Set()
    #shouldMorphFrame = false
    action = null

    constructor(element) {
      this.element = element;
      this.view = new FrameView(this, this.element);
      this.appearanceObserver = new AppearanceObserver(this, this.element);
      this.formLinkClickObserver = new FormLinkClickObserver(this, this.element);
      this.linkInterceptor = new LinkInterceptor(this, this.element);
      this.restorationIdentifier = uuid();
      this.formSubmitObserver = new FormSubmitObserver(this, this.element);
    }

    // Frame delegate

    connect() {
      if (!this.#connected) {
        this.#connected = true;
        if (this.loadingStyle == FrameLoadingStyle.lazy) {
          this.appearanceObserver.start();
        } else {
          this.#loadSourceURL();
        }
        this.formLinkClickObserver.start();
        this.linkInterceptor.start();
        this.formSubmitObserver.start();
      }
    }

    disconnect() {
      if (this.#connected) {
        this.#connected = false;
        this.appearanceObserver.stop();
        this.formLinkClickObserver.stop();
        this.linkInterceptor.stop();
        this.formSubmitObserver.stop();
      }
    }

    disabledChanged() {
      if (this.loadingStyle == FrameLoadingStyle.eager) {
        this.#loadSourceURL();
      }
    }

    sourceURLChanged() {
      if (this.#isIgnoringChangesTo("src")) return

      if (this.element.isConnected) {
        this.complete = false;
      }

      if (this.loadingStyle == FrameLoadingStyle.eager || this.#hasBeenLoaded) {
        this.#loadSourceURL();
      }
    }

    sourceURLReloaded() {
      const { refresh, src } = this.element;

      this.#shouldMorphFrame = src && refresh === "morph";

      this.element.removeAttribute("complete");
      this.element.src = null;
      this.element.src = src;
      return this.element.loaded
    }

    loadingStyleChanged() {
      if (this.loadingStyle == FrameLoadingStyle.lazy) {
        this.appearanceObserver.start();
      } else {
        this.appearanceObserver.stop();
        this.#loadSourceURL();
      }
    }

    async #loadSourceURL() {
      if (this.enabled && this.isActive && !this.complete && this.sourceURL) {
        this.element.loaded = this.#visit(expandURL(this.sourceURL));
        this.appearanceObserver.stop();
        await this.element.loaded;
        this.#hasBeenLoaded = true;
      }
    }

    async loadResponse(fetchResponse) {
      if (fetchResponse.redirected || (fetchResponse.succeeded && fetchResponse.isHTML)) {
        this.sourceURL = fetchResponse.response.url;
      }

      try {
        const html = await fetchResponse.responseHTML;
        if (html) {
          const document = parseHTMLDocument(html);
          const pageSnapshot = PageSnapshot.fromDocument(document);

          if (pageSnapshot.isVisitable) {
            await this.#loadFrameResponse(fetchResponse, document);
          } else {
            await this.#handleUnvisitableFrameResponse(fetchResponse);
          }
        }
      } finally {
        this.#shouldMorphFrame = false;
        this.fetchResponseLoaded = () => Promise.resolve();
      }
    }

    // Appearance observer delegate

    elementAppearedInViewport(element) {
      this.proposeVisitIfNavigatedWithAction(element, getVisitAction(element));
      this.#loadSourceURL();
    }

    // Form link click observer delegate

    willSubmitFormLinkToLocation(link) {
      return this.#shouldInterceptNavigation(link)
    }

    submittedFormLinkToLocation(link, _location, form) {
      const frame = this.#findFrameElement(link);
      if (frame) form.setAttribute("data-turbo-frame", frame.id);
    }

    // Link interceptor delegate

    shouldInterceptLinkClick(element, _location, _event) {
      return this.#shouldInterceptNavigation(element)
    }

    linkClickIntercepted(element, location) {
      this.#navigateFrame(element, location);
    }

    // Form submit observer delegate

    willSubmitForm(element, submitter) {
      return element.closest("turbo-frame") == this.element && this.#shouldInterceptNavigation(element, submitter)
    }

    formSubmitted(element, submitter) {
      if (this.formSubmission) {
        this.formSubmission.stop();
      }

      this.formSubmission = new FormSubmission(this, element, submitter);
      const { fetchRequest } = this.formSubmission;
      this.prepareRequest(fetchRequest);
      this.formSubmission.start();
    }

    // Fetch request delegate

    prepareRequest(request) {
      request.headers["Turbo-Frame"] = this.id;

      if (this.currentNavigationElement?.hasAttribute("data-turbo-stream")) {
        request.acceptResponseType(StreamMessage.contentType);
      }
    }

    requestStarted(_request) {
      markAsBusy(this.element);
    }

    requestPreventedHandlingResponse(_request, _response) {
      this.#resolveVisitPromise();
    }

    async requestSucceededWithResponse(request, response) {
      await this.loadResponse(response);
      this.#resolveVisitPromise();
    }

    async requestFailedWithResponse(request, response) {
      await this.loadResponse(response);
      this.#resolveVisitPromise();
    }

    requestErrored(request, error) {
      console.error(error);
      this.#resolveVisitPromise();
    }

    requestFinished(_request) {
      clearBusyState(this.element);
    }

    // Form submission delegate

    formSubmissionStarted({ formElement }) {
      markAsBusy(formElement, this.#findFrameElement(formElement));
    }

    formSubmissionSucceededWithResponse(formSubmission, response) {
      const frame = this.#findFrameElement(formSubmission.formElement, formSubmission.submitter);

      frame.delegate.proposeVisitIfNavigatedWithAction(frame, getVisitAction(formSubmission.submitter, formSubmission.formElement, frame));
      frame.delegate.loadResponse(response);

      if (!formSubmission.isSafe) {
        session.clearCache();
      }
    }

    formSubmissionFailedWithResponse(formSubmission, fetchResponse) {
      this.element.delegate.loadResponse(fetchResponse);
      session.clearCache();
    }

    formSubmissionErrored(formSubmission, error) {
      console.error(error);
    }

    formSubmissionFinished({ formElement }) {
      clearBusyState(formElement, this.#findFrameElement(formElement));
    }

    // View delegate

    allowsImmediateRender({ element: newFrame }, options) {
      const event = dispatch("turbo:before-frame-render", {
        target: this.element,
        detail: { newFrame, ...options },
        cancelable: true
      });

      const {
        defaultPrevented,
        detail: { render }
      } = event;

      if (this.view.renderer && render) {
        this.view.renderer.renderElement = render;
      }

      return !defaultPrevented
    }

    viewRenderedSnapshot(_snapshot, _isPreview, _renderMethod) {}

    preloadOnLoadLinksForView(element) {
      session.preloadOnLoadLinksForView(element);
    }

    viewInvalidated() {}

    // Frame renderer delegate

    willRenderFrame(currentElement, _newElement) {
      this.previousFrameElement = currentElement.cloneNode(true);
    }

    visitCachedSnapshot = ({ element }) => {
      const frame = element.querySelector("#" + this.element.id);

      if (frame && this.previousFrameElement) {
        frame.replaceChildren(...this.previousFrameElement.children);
      }

      delete this.previousFrameElement;
    }

    // Private

    async #loadFrameResponse(fetchResponse, document) {
      const newFrameElement = await this.extractForeignFrameElement(document.body);
      const rendererClass = this.#shouldMorphFrame ? MorphingFrameRenderer : FrameRenderer;

      if (newFrameElement) {
        const snapshot = new Snapshot(newFrameElement);
        const renderer = new rendererClass(this, this.view.snapshot, snapshot, false, false);
        if (this.view.renderPromise) await this.view.renderPromise;
        this.changeHistory();

        await this.view.render(renderer);
        this.complete = true;
        session.frameRendered(fetchResponse, this.element);
        session.frameLoaded(this.element);
        await this.fetchResponseLoaded(fetchResponse);
      } else if (this.#willHandleFrameMissingFromResponse(fetchResponse)) {
        this.#handleFrameMissingFromResponse(fetchResponse);
      }
    }

    async #visit(url) {
      const request = new FetchRequest(this, FetchMethod.get, url, new URLSearchParams(), this.element);

      this.#currentFetchRequest?.cancel();
      this.#currentFetchRequest = request;

      return new Promise((resolve) => {
        this.#resolveVisitPromise = () => {
          this.#resolveVisitPromise = () => {};
          this.#currentFetchRequest = null;
          resolve();
        };
        request.perform();
      })
    }

    #navigateFrame(element, url, submitter) {
      const frame = this.#findFrameElement(element, submitter);

      frame.delegate.proposeVisitIfNavigatedWithAction(frame, getVisitAction(submitter, element, frame));

      this.#withCurrentNavigationElement(element, () => {
        frame.src = url;
      });
    }

    proposeVisitIfNavigatedWithAction(frame, action = null) {
      this.action = action;

      if (this.action) {
        const pageSnapshot = PageSnapshot.fromElement(frame).clone();
        const { visitCachedSnapshot } = frame.delegate;

        frame.delegate.fetchResponseLoaded = async (fetchResponse) => {
          if (frame.src) {
            const { statusCode, redirected } = fetchResponse;
            const responseHTML = await fetchResponse.responseHTML;
            const response = { statusCode, redirected, responseHTML };
            const options = {
              response,
              visitCachedSnapshot,
              willRender: false,
              updateHistory: false,
              restorationIdentifier: this.restorationIdentifier,
              snapshot: pageSnapshot
            };

            if (this.action) options.action = this.action;

            session.visit(frame.src, options);
          }
        };
      }
    }

    changeHistory() {
      if (this.action) {
        const method = getHistoryMethodForAction(this.action);
        session.history.update(method, expandURL(this.element.src || ""), this.restorationIdentifier);
      }
    }

    async #handleUnvisitableFrameResponse(fetchResponse) {
      console.warn(
        `The response (${fetchResponse.statusCode}) from <turbo-frame id="${this.element.id}"> is performing a full page visit due to turbo-visit-control.`
      );

      await this.#visitResponse(fetchResponse.response);
    }

    #willHandleFrameMissingFromResponse(fetchResponse) {
      this.element.setAttribute("complete", "");

      const response = fetchResponse.response;
      const visit = async (url, options) => {
        if (url instanceof Response) {
          this.#visitResponse(url);
        } else {
          session.visit(url, options);
        }
      };

      const event = dispatch("turbo:frame-missing", {
        target: this.element,
        detail: { response, visit },
        cancelable: true
      });

      return !event.defaultPrevented
    }

    #handleFrameMissingFromResponse(fetchResponse) {
      this.view.missing();
      this.#throwFrameMissingError(fetchResponse);
    }

    #throwFrameMissingError(fetchResponse) {
      const message = `The response (${fetchResponse.statusCode}) did not contain the expected <turbo-frame id="${this.element.id}"> and will be ignored. To perform a full page visit instead, set turbo-visit-control to reload.`;
      throw new TurboFrameMissingError(message)
    }

    async #visitResponse(response) {
      const wrapped = new FetchResponse(response);
      const responseHTML = await wrapped.responseHTML;
      const { location, redirected, statusCode } = wrapped;

      return session.visit(location, { response: { redirected, statusCode, responseHTML } })
    }

    #findFrameElement(element, submitter) {
      const id = getAttribute("data-turbo-frame", submitter, element) || this.element.getAttribute("target");
      return getFrameElementById(id) ?? this.element
    }

    async extractForeignFrameElement(container) {
      let element;
      const id = CSS.escape(this.id);

      try {
        element = activateElement(container.querySelector(`turbo-frame#${id}`), this.sourceURL);
        if (element) {
          return element
        }

        element = activateElement(container.querySelector(`turbo-frame[src][recurse~=${id}]`), this.sourceURL);
        if (element) {
          await element.loaded;
          return await this.extractForeignFrameElement(element)
        }
      } catch (error) {
        console.error(error);
        return new FrameElement()
      }

      return null
    }

    #formActionIsVisitable(form, submitter) {
      const action = getAction$1(form, submitter);

      return locationIsVisitable(expandURL(action), this.rootLocation)
    }

    #shouldInterceptNavigation(element, submitter) {
      const id = getAttribute("data-turbo-frame", submitter, element) || this.element.getAttribute("target");

      if (element instanceof HTMLFormElement && !this.#formActionIsVisitable(element, submitter)) {
        return false
      }

      if (!this.enabled || id == "_top") {
        return false
      }

      if (id) {
        const frameElement = getFrameElementById(id);
        if (frameElement) {
          return !frameElement.disabled
        }
      }

      if (!session.elementIsNavigatable(element)) {
        return false
      }

      if (submitter && !session.elementIsNavigatable(submitter)) {
        return false
      }

      return true
    }

    // Computed properties

    get id() {
      return this.element.id
    }

    get enabled() {
      return !this.element.disabled
    }

    get sourceURL() {
      if (this.element.src) {
        return this.element.src
      }
    }

    set sourceURL(sourceURL) {
      this.#ignoringChangesToAttribute("src", () => {
        this.element.src = sourceURL ?? null;
      });
    }

    get loadingStyle() {
      return this.element.loading
    }

    get isLoading() {
      return this.formSubmission !== undefined || this.#resolveVisitPromise() !== undefined
    }

    get complete() {
      return this.element.hasAttribute("complete")
    }

    set complete(value) {
      if (value) {
        this.element.setAttribute("complete", "");
      } else {
        this.element.removeAttribute("complete");
      }
    }

    get isActive() {
      return this.element.isActive && this.#connected
    }

    get rootLocation() {
      const meta = this.element.ownerDocument.querySelector(`meta[name="turbo-root"]`);
      const root = meta?.content ?? "/";
      return expandURL(root)
    }

    #isIgnoringChangesTo(attributeName) {
      return this.#ignoredAttributes.has(attributeName)
    }

    #ignoringChangesToAttribute(attributeName, callback) {
      this.#ignoredAttributes.add(attributeName);
      callback();
      this.#ignoredAttributes.delete(attributeName);
    }

    #withCurrentNavigationElement(element, callback) {
      this.currentNavigationElement = element;
      callback();
      delete this.currentNavigationElement;
    }
  }

  function getFrameElementById(id) {
    if (id != null) {
      const element = document.getElementById(id);
      if (element instanceof FrameElement) {
        return element
      }
    }
  }

  function activateElement(element, currentURL) {
    if (element) {
      const src = element.getAttribute("src");
      if (src != null && currentURL != null && urlsAreEqual(src, currentURL)) {
        throw new Error(`Matching <turbo-frame id="${element.id}"> element has a source URL which references itself`)
      }
      if (element.ownerDocument !== document) {
        element = document.importNode(element, true);
      }

      if (element instanceof FrameElement) {
        element.connectedCallback();
        element.disconnectedCallback();
        return element
      }
    }
  }

  const StreamActions = {
    after() {
      this.targetElements.forEach((e) => e.parentElement?.insertBefore(this.templateContent, e.nextSibling));
    },

    append() {
      this.removeDuplicateTargetChildren();
      this.targetElements.forEach((e) => e.append(this.templateContent));
    },

    before() {
      this.targetElements.forEach((e) => e.parentElement?.insertBefore(this.templateContent, e));
    },

    prepend() {
      this.removeDuplicateTargetChildren();
      this.targetElements.forEach((e) => e.prepend(this.templateContent));
    },

    remove() {
      this.targetElements.forEach((e) => e.remove());
    },

    replace() {
      const method = this.getAttribute("method");

      this.targetElements.forEach((targetElement) => {
        if (method === "morph") {
          morphElements(targetElement, this.templateContent);
        } else {
          targetElement.replaceWith(this.templateContent);
        }
      });
    },

    update() {
      const method = this.getAttribute("method");

      this.targetElements.forEach((targetElement) => {
        if (method === "morph") {
          morphChildren(targetElement, this.templateContent);
        } else {
          targetElement.innerHTML = "";
          targetElement.append(this.templateContent);
        }
      });
    },

    refresh() {
      session.refresh(this.baseURI, this.requestId);
    }
  };

  // <turbo-stream action=replace target=id><template>...

  /**
   * Renders updates to the page from a stream of messages.
   *
   * Using the `action` attribute, this can be configured one of eight ways:
   *
   * - `after` - inserts the result after the target
   * - `append` - appends the result to the target
   * - `before` - inserts the result before the target
   * - `prepend` - prepends the result to the target
   * - `refresh` - initiates a page refresh
   * - `remove` - removes the target
   * - `replace` - replaces the outer HTML of the target
   * - `update` - replaces the inner HTML of the target
   *
   * @customElement turbo-stream
   * @example
   *   <turbo-stream action="append" target="dom_id">
   *     <template>
   *       Content to append to target designated with the dom_id.
   *     </template>
   *   </turbo-stream>
   */
  class StreamElement extends HTMLElement {
    static async renderElement(newElement) {
      await newElement.performAction();
    }

    async connectedCallback() {
      try {
        await this.render();
      } catch (error) {
        console.error(error);
      } finally {
        this.disconnect();
      }
    }

    async render() {
      return (this.renderPromise ??= (async () => {
        const event = this.beforeRenderEvent;

        if (this.dispatchEvent(event)) {
          await nextRepaint();
          await event.detail.render(this);
        }
      })())
    }

    disconnect() {
      try {
        this.remove();
        // eslint-disable-next-line no-empty
      } catch {}
    }

    /**
     * Removes duplicate children (by ID)
     */
    removeDuplicateTargetChildren() {
      this.duplicateChildren.forEach((c) => c.remove());
    }

    /**
     * Gets the list of duplicate children (i.e. those with the same ID)
     */
    get duplicateChildren() {
      const existingChildren = this.targetElements.flatMap((e) => [...e.children]).filter((c) => !!c.id);
      const newChildrenIds = [...(this.templateContent?.children || [])].filter((c) => !!c.id).map((c) => c.id);

      return existingChildren.filter((c) => newChildrenIds.includes(c.id))
    }

    /**
     * Gets the action function to be performed.
     */
    get performAction() {
      if (this.action) {
        const actionFunction = StreamActions[this.action];
        if (actionFunction) {
          return actionFunction
        }
        this.#raise("unknown action");
      }
      this.#raise("action attribute is missing");
    }

    /**
     * Gets the target elements which the template will be rendered to.
     */
    get targetElements() {
      if (this.target) {
        return this.targetElementsById
      } else if (this.targets) {
        return this.targetElementsByQuery
      } else {
        this.#raise("target or targets attribute is missing");
      }
    }

    /**
     * Gets the contents of the main `<template>`.
     */
    get templateContent() {
      return this.templateElement.content.cloneNode(true)
    }

    /**
     * Gets the main `<template>` used for rendering
     */
    get templateElement() {
      if (this.firstElementChild === null) {
        const template = this.ownerDocument.createElement("template");
        this.appendChild(template);
        return template
      } else if (this.firstElementChild instanceof HTMLTemplateElement) {
        return this.firstElementChild
      }
      this.#raise("first child element must be a <template> element");
    }

    /**
     * Gets the current action.
     */
    get action() {
      return this.getAttribute("action")
    }

    /**
     * Gets the current target (an element ID) to which the result will
     * be rendered.
     */
    get target() {
      return this.getAttribute("target")
    }

    /**
     * Gets the current "targets" selector (a CSS selector)
     */
    get targets() {
      return this.getAttribute("targets")
    }

    /**
     * Reads the request-id attribute
     */
    get requestId() {
      return this.getAttribute("request-id")
    }

    #raise(message) {
      throw new Error(`${this.description}: ${message}`)
    }

    get description() {
      return (this.outerHTML.match(/<[^>]+>/) ?? [])[0] ?? "<turbo-stream>"
    }

    get beforeRenderEvent() {
      return new CustomEvent("turbo:before-stream-render", {
        bubbles: true,
        cancelable: true,
        detail: { newStream: this, render: StreamElement.renderElement }
      })
    }

    get targetElementsById() {
      const element = this.ownerDocument?.getElementById(this.target);

      if (element !== null) {
        return [element]
      } else {
        return []
      }
    }

    get targetElementsByQuery() {
      const elements = this.ownerDocument?.querySelectorAll(this.targets);

      if (elements.length !== 0) {
        return Array.prototype.slice.call(elements)
      } else {
        return []
      }
    }
  }

  class StreamSourceElement extends HTMLElement {
    streamSource = null

    connectedCallback() {
      this.streamSource = this.src.match(/^ws{1,2}:/) ? new WebSocket(this.src) : new EventSource(this.src);

      connectStreamSource(this.streamSource);
    }

    disconnectedCallback() {
      if (this.streamSource) {
        this.streamSource.close();

        disconnectStreamSource(this.streamSource);
      }
    }

    get src() {
      return this.getAttribute("src") || ""
    }
  }

  FrameElement.delegateConstructor = FrameController;

  if (customElements.get("turbo-frame") === undefined) {
    customElements.define("turbo-frame", FrameElement);
  }

  if (customElements.get("turbo-stream") === undefined) {
    customElements.define("turbo-stream", StreamElement);
  }

  if (customElements.get("turbo-stream-source") === undefined) {
    customElements.define("turbo-stream-source", StreamSourceElement);
  }

  (() => {
    let element = document.currentScript;
    if (!element) return
    if (element.hasAttribute("data-turbo-suppress-warning")) return

    element = element.parentElement;
    while (element) {
      if (element == document.body) {
        return console.warn(
          unindent`
        You are loading Turbo from a <script> element inside the <body> element. This is probably not what you meant to do!

        Load your application’s JavaScript bundle inside the <head> element instead. <script> elements in <body> are evaluated with each page change.

        For more information, see: https://turbo.hotwired.dev/handbook/building#working-with-script-elements

        ——
        Suppress this warning by adding a "data-turbo-suppress-warning" attribute to: %s
      `,
          element.outerHTML
        )
      }

      element = element.parentElement;
    }
  })();

  window.Turbo = { ...Turbo, StreamActions };
  start();

  var Turbo$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    FetchEnctype: FetchEnctype,
    FetchMethod: FetchMethod,
    FetchRequest: FetchRequest,
    FetchResponse: FetchResponse,
    FrameElement: FrameElement,
    FrameLoadingStyle: FrameLoadingStyle,
    FrameRenderer: FrameRenderer,
    PageRenderer: PageRenderer,
    PageSnapshot: PageSnapshot,
    StreamActions: StreamActions,
    StreamElement: StreamElement,
    StreamSourceElement: StreamSourceElement,
    cache: cache,
    clearCache: clearCache,
    config: config,
    connectStreamSource: connectStreamSource,
    disconnectStreamSource: disconnectStreamSource,
    fetch: fetchWithTurboHeaders,
    fetchEnctypeFromString: fetchEnctypeFromString,
    fetchMethodFromString: fetchMethodFromString,
    isSafe: isSafe,
    navigator: navigator$1,
    registerAdapter: registerAdapter,
    renderStreamMessage: renderStreamMessage,
    session: session,
    setConfirmMethod: setConfirmMethod,
    setFormMode: setFormMode,
    setProgressBarDelay: setProgressBarDelay,
    start: start,
    visit: visit
  });

  let consumer;

  async function getConsumer() {
    return consumer || setConsumer(createConsumer$1().then(setConsumer))
  }

  function setConsumer(newConsumer) {
    return consumer = newConsumer
  }

  async function createConsumer$1() {
    const { createConsumer } = await Promise.resolve().then(function () { return index; });
    return createConsumer()
  }

  async function subscribeTo(channel, mixin) {
    const { subscriptions } = await getConsumer();
    return subscriptions.create(channel, mixin)
  }

  // Based on https://github.com/nathan7/snakeize
  //
  // This software is released under the MIT license:
  // Permission is hereby granted, free of charge, to any person obtaining a copy of
  // this software and associated documentation files (the "Software"), to deal in
  // the Software without restriction, including without limitation the rights to
  // use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
  // the Software, and to permit persons to whom the Software is furnished to do so,
  // subject to the following conditions:

  // The above copyright notice and this permission notice shall be included in all
  // copies or substantial portions of the Software.

  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  // IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
  // FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
  // COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
  // IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  // CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
  function walk (obj) {
      if (!obj || typeof obj !== 'object') return obj;
      if (obj instanceof Date || obj instanceof RegExp) return obj;
      if (Array.isArray(obj)) return obj.map(walk);
      return Object.keys(obj).reduce(function (acc, key) {
          var camel = key[0].toLowerCase() + key.slice(1).replace(/([A-Z]+)/g, function (m, x) {
              return '_' + x.toLowerCase();
          });
          acc[camel] = walk(obj[key]);
          return acc;
      }, {});
  }

  class TurboCableStreamSourceElement extends HTMLElement {
    static observedAttributes = ["channel", "signed-stream-name"]

    async connectedCallback() {
      connectStreamSource(this);
      this.subscription = await subscribeTo(this.channel, {
        received: this.dispatchMessageEvent.bind(this),
        connected: this.subscriptionConnected.bind(this),
        disconnected: this.subscriptionDisconnected.bind(this)
      });
    }

    disconnectedCallback() {
      disconnectStreamSource(this);
      if (this.subscription) this.subscription.unsubscribe();
      this.subscriptionDisconnected();
    }

    attributeChangedCallback() {
      if (this.subscription) {
        this.disconnectedCallback();
        this.connectedCallback();
      }
    }

    dispatchMessageEvent(data) {
      const event = new MessageEvent("message", { data });
      return this.dispatchEvent(event)
    }

    subscriptionConnected() {
      this.setAttribute("connected", "");
    }

    subscriptionDisconnected() {
      this.removeAttribute("connected");
    }

    get channel() {
      const channel = this.getAttribute("channel");
      const signed_stream_name = this.getAttribute("signed-stream-name");
      return { channel, signed_stream_name, ...walk({ ...this.dataset }) }
    }
  }


  if (customElements.get("turbo-cable-stream-source") === undefined) {
    customElements.define("turbo-cable-stream-source", TurboCableStreamSourceElement);
  }

  function encodeMethodIntoRequestBody(event) {
    if (event.target instanceof HTMLFormElement) {
      const { target: form, detail: { fetchOptions } } = event;

      form.addEventListener("turbo:submit-start", ({ detail: { formSubmission: { submitter } } }) => {
        const body = isBodyInit(fetchOptions.body) ? fetchOptions.body : new URLSearchParams();
        const method = determineFetchMethod(submitter, body, form);

        if (!/get/i.test(method)) {
          if (/post/i.test(method)) {
            body.delete("_method");
          } else {
            body.set("_method", method);
          }

          fetchOptions.method = "post";
        }
      }, { once: true });
    }
  }

  function determineFetchMethod(submitter, body, form) {
    const formMethod = determineFormMethod(submitter);
    const overrideMethod = body.get("_method");
    const method = form.getAttribute("method") || "get";

    if (typeof formMethod == "string") {
      return formMethod
    } else if (typeof overrideMethod == "string") {
      return overrideMethod
    } else {
      return method
    }
  }

  function determineFormMethod(submitter) {
    if (submitter instanceof HTMLButtonElement || submitter instanceof HTMLInputElement) {
      // Rails 7 ActionView::Helpers::FormBuilder#button method has an override
      // for formmethod if the button does not have name or value attributes
      // set, which is the default. This means that if you use <%= f.button
      // formmethod: :delete %>, it will generate a <button name="_method"
      // value="delete" formmethod="post">. Therefore, if the submitter's name
      // is already _method, it's value attribute already contains the desired
      // method.
      if (submitter.name === '_method') {
        return submitter.value
      } else if (submitter.hasAttribute("formmethod")) {
        return submitter.formMethod
      } else {
        return null
      }
    } else {
      return null
    }
  }

  function isBodyInit(body) {
    return body instanceof FormData || body instanceof URLSearchParams
  }

  window.Turbo = Turbo$1;

  addEventListener("turbo:before-fetch-request", encodeMethodIntoRequestBody);

  function log() {
    if (HotwireSpark.config.loggingEnabled) {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      console.log(`[hotwire_spark]`, ...args);
    }
  }

  function nameFromFilePath(path) {
    return path.split("/").pop().split(".")[0];
  }
  function urlWithParams(urlString, params) {
    const url = new URL(urlString, window.location.origin);
    Object.entries(params).forEach(_ref => {
      let [key, value] = _ref;
      url.searchParams.set(key, value);
    });
    return url.toString();
  }
  function cacheBustedUrl(urlString) {
    return urlWithParams(urlString, {
      reload: Date.now()
    });
  }
  async function reloadHtmlDocument() {
    let currentUrl = urlWithParams(window.location.href, {
      hotwire_spark: "true"
    });
    const response = await fetch(currentUrl);
    const fetchedHTML = await response.text();
    const parser = new DOMParser();
    return parser.parseFromString(fetchedHTML, "text/html");
  }

  class CssReloader {
    static async reload() {
      for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
        params[_key] = arguments[_key];
      }
      return new CssReloader(...params).reload();
    }
    constructor() {
      let filePattern = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : /./;
      this.filePattern = filePattern;
    }
    async reload() {
      log("Reload css...");
      this.newCssLinks = await this.#loadNewCssLinks();
      await Promise.all(this.#reloadAllLinks());
    }
    async #loadNewCssLinks() {
      const reloadedDocument = await reloadHtmlDocument();
      return Array.from(reloadedDocument.head.querySelectorAll("link[rel='stylesheet']"));
    }
    #reloadAllLinks() {
      return Array.from(this.#cssLinks).map(link => this.#reloadLinkIfNeeded(link));
    }
    get #cssLinks() {
      return document.querySelectorAll("link[rel='stylesheet']");
    }
    #reloadLinkIfNeeded(link) {
      if (this.#shouldReloadLink(link)) {
        return this.#reloadLink(link);
      } else {
        return Promise.resolve();
      }
    }
    #shouldReloadLink(link) {
      return this.filePattern.test(link.getAttribute("href"));
    }
    async #reloadLink(link) {
      return new Promise(resolve => {
        const href = link.getAttribute("href");
        const newLink = this.#findNewLinkFor(link);
        newLink.onload = () => {
          log(`\t${href}`);
          resolve();
        };
        link.parentNode.replaceChild(newLink, link);
      });
    }
    #findNewLinkFor(link) {
      return this.newCssLinks.find(newLink => {
        return this.#withoutAssetDigest(link.href) === this.#withoutAssetDigest(newLink.href);
      });
    }
    #withoutAssetDigest(url) {
      return url.replace(/-[^-]+\.css$/, ".css");
    }
  }

  StreamActions.reload_css = function () {
    const filePath = nameFromFilePath(this.getAttribute("file_path"));
    CssReloader.reload(new RegExp(filePath));
  };

  // base IIFE to define idiomorph
  var Idiomorph = (function () {

          //=============================================================================
          // AND NOW IT BEGINS...
          //=============================================================================
          let EMPTY_SET = new Set();

          // default configuration values, updatable by users now
          let defaults = {
              morphStyle: "outerHTML",
              callbacks : {
                  beforeNodeAdded: noOp,
                  afterNodeAdded: noOp,
                  beforeNodeMorphed: noOp,
                  afterNodeMorphed: noOp,
                  beforeNodeRemoved: noOp,
                  afterNodeRemoved: noOp,
                  beforeAttributeUpdated: noOp,

              },
              head: {
                  style: 'merge',
                  shouldPreserve: function (elt) {
                      return elt.getAttribute("im-preserve") === "true";
                  },
                  shouldReAppend: function (elt) {
                      return elt.getAttribute("im-re-append") === "true";
                  },
                  shouldRemove: noOp,
                  afterHeadMorphed: noOp,
              }
          };

          //=============================================================================
          // Core Morphing Algorithm - morph, morphNormalizedContent, morphOldNodeTo, morphChildren
          //=============================================================================
          function morph(oldNode, newContent, config = {}) {

              if (oldNode instanceof Document) {
                  oldNode = oldNode.documentElement;
              }

              if (typeof newContent === 'string') {
                  newContent = parseContent(newContent);
              }

              let normalizedContent = normalizeContent(newContent);

              let ctx = createMorphContext(oldNode, normalizedContent, config);

              return morphNormalizedContent(oldNode, normalizedContent, ctx);
          }

          function morphNormalizedContent(oldNode, normalizedNewContent, ctx) {
              if (ctx.head.block) {
                  let oldHead = oldNode.querySelector('head');
                  let newHead = normalizedNewContent.querySelector('head');
                  if (oldHead && newHead) {
                      let promises = handleHeadElement(newHead, oldHead, ctx);
                      // when head promises resolve, call morph again, ignoring the head tag
                      Promise.all(promises).then(function () {
                          morphNormalizedContent(oldNode, normalizedNewContent, Object.assign(ctx, {
                              head: {
                                  block: false,
                                  ignore: true
                              }
                          }));
                      });
                      return;
                  }
              }

              if (ctx.morphStyle === "innerHTML") {

                  // innerHTML, so we are only updating the children
                  morphChildren(normalizedNewContent, oldNode, ctx);
                  return oldNode.children;

              } else if (ctx.morphStyle === "outerHTML" || ctx.morphStyle == null) {
                  // otherwise find the best element match in the new content, morph that, and merge its siblings
                  // into either side of the best match
                  let bestMatch = findBestNodeMatch(normalizedNewContent, oldNode, ctx);

                  // stash the siblings that will need to be inserted on either side of the best match
                  let previousSibling = bestMatch?.previousSibling;
                  let nextSibling = bestMatch?.nextSibling;

                  // morph it
                  let morphedNode = morphOldNodeTo(oldNode, bestMatch, ctx);

                  if (bestMatch) {
                      // if there was a best match, merge the siblings in too and return the
                      // whole bunch
                      return insertSiblings(previousSibling, morphedNode, nextSibling);
                  } else {
                      // otherwise nothing was added to the DOM
                      return []
                  }
              } else {
                  throw "Do not understand how to morph style " + ctx.morphStyle;
              }
          }


          /**
           * @param possibleActiveElement
           * @param ctx
           * @returns {boolean}
           */
          function ignoreValueOfActiveElement(possibleActiveElement, ctx) {
              return ctx.ignoreActiveValue && possibleActiveElement === document.activeElement;
          }

          /**
           * @param oldNode root node to merge content into
           * @param newContent new content to merge
           * @param ctx the merge context
           * @returns {Element} the element that ended up in the DOM
           */
          function morphOldNodeTo(oldNode, newContent, ctx) {
              if (ctx.ignoreActive && oldNode === document.activeElement) ; else if (newContent == null) {
                  if (ctx.callbacks.beforeNodeRemoved(oldNode) === false) return oldNode;

                  oldNode.remove();
                  ctx.callbacks.afterNodeRemoved(oldNode);
                  return null;
              } else if (!isSoftMatch(oldNode, newContent)) {
                  if (ctx.callbacks.beforeNodeRemoved(oldNode) === false) return oldNode;
                  if (ctx.callbacks.beforeNodeAdded(newContent) === false) return oldNode;

                  oldNode.parentElement.replaceChild(newContent, oldNode);
                  ctx.callbacks.afterNodeAdded(newContent);
                  ctx.callbacks.afterNodeRemoved(oldNode);
                  return newContent;
              } else {
                  if (ctx.callbacks.beforeNodeMorphed(oldNode, newContent) === false) return oldNode;

                  if (oldNode instanceof HTMLHeadElement && ctx.head.ignore) ; else if (oldNode instanceof HTMLHeadElement && ctx.head.style !== "morph") {
                      handleHeadElement(newContent, oldNode, ctx);
                  } else {
                      syncNodeFrom(newContent, oldNode, ctx);
                      if (!ignoreValueOfActiveElement(oldNode, ctx)) {
                          morphChildren(newContent, oldNode, ctx);
                      }
                  }
                  ctx.callbacks.afterNodeMorphed(oldNode, newContent);
                  return oldNode;
              }
          }

          /**
           * This is the core algorithm for matching up children.  The idea is to use id sets to try to match up
           * nodes as faithfully as possible.  We greedily match, which allows us to keep the algorithm fast, but
           * by using id sets, we are able to better match up with content deeper in the DOM.
           *
           * Basic algorithm is, for each node in the new content:
           *
           * - if we have reached the end of the old parent, append the new content
           * - if the new content has an id set match with the current insertion point, morph
           * - search for an id set match
           * - if id set match found, morph
           * - otherwise search for a "soft" match
           * - if a soft match is found, morph
           * - otherwise, prepend the new node before the current insertion point
           *
           * The two search algorithms terminate if competing node matches appear to outweigh what can be achieved
           * with the current node.  See findIdSetMatch() and findSoftMatch() for details.
           *
           * @param {Element} newParent the parent element of the new content
           * @param {Element } oldParent the old content that we are merging the new content into
           * @param ctx the merge context
           */
          function morphChildren(newParent, oldParent, ctx) {

              let nextNewChild = newParent.firstChild;
              let insertionPoint = oldParent.firstChild;
              let newChild;

              // run through all the new content
              while (nextNewChild) {

                  newChild = nextNewChild;
                  nextNewChild = newChild.nextSibling;

                  // if we are at the end of the exiting parent's children, just append
                  if (insertionPoint == null) {
                      if (ctx.callbacks.beforeNodeAdded(newChild) === false) return;

                      oldParent.appendChild(newChild);
                      ctx.callbacks.afterNodeAdded(newChild);
                      removeIdsFromConsideration(ctx, newChild);
                      continue;
                  }

                  // if the current node has an id set match then morph
                  if (isIdSetMatch(newChild, insertionPoint, ctx)) {
                      morphOldNodeTo(insertionPoint, newChild, ctx);
                      insertionPoint = insertionPoint.nextSibling;
                      removeIdsFromConsideration(ctx, newChild);
                      continue;
                  }

                  // otherwise search forward in the existing old children for an id set match
                  let idSetMatch = findIdSetMatch(newParent, oldParent, newChild, insertionPoint, ctx);

                  // if we found a potential match, remove the nodes until that point and morph
                  if (idSetMatch) {
                      insertionPoint = removeNodesBetween(insertionPoint, idSetMatch, ctx);
                      morphOldNodeTo(idSetMatch, newChild, ctx);
                      removeIdsFromConsideration(ctx, newChild);
                      continue;
                  }

                  // no id set match found, so scan forward for a soft match for the current node
                  let softMatch = findSoftMatch(newParent, oldParent, newChild, insertionPoint, ctx);

                  // if we found a soft match for the current node, morph
                  if (softMatch) {
                      insertionPoint = removeNodesBetween(insertionPoint, softMatch, ctx);
                      morphOldNodeTo(softMatch, newChild, ctx);
                      removeIdsFromConsideration(ctx, newChild);
                      continue;
                  }

                  // abandon all hope of morphing, just insert the new child before the insertion point
                  // and move on
                  if (ctx.callbacks.beforeNodeAdded(newChild) === false) return;

                  oldParent.insertBefore(newChild, insertionPoint);
                  ctx.callbacks.afterNodeAdded(newChild);
                  removeIdsFromConsideration(ctx, newChild);
              }

              // remove any remaining old nodes that didn't match up with new content
              while (insertionPoint !== null) {

                  let tempNode = insertionPoint;
                  insertionPoint = insertionPoint.nextSibling;
                  removeNode(tempNode, ctx);
              }
          }

          //=============================================================================
          // Attribute Syncing Code
          //=============================================================================

          /**
           * @param attr {String} the attribute to be mutated
           * @param to {Element} the element that is going to be updated
           * @param updateType {("update"|"remove")}
           * @param ctx the merge context
           * @returns {boolean} true if the attribute should be ignored, false otherwise
           */
          function ignoreAttribute(attr, to, updateType, ctx) {
              if(attr === 'value' && ctx.ignoreActiveValue && to === document.activeElement){
                  return true;
              }
              return ctx.callbacks.beforeAttributeUpdated(attr, to, updateType) === false;
          }

          /**
           * syncs a given node with another node, copying over all attributes and
           * inner element state from the 'from' node to the 'to' node
           *
           * @param {Element} from the element to copy attributes & state from
           * @param {Element} to the element to copy attributes & state to
           * @param ctx the merge context
           */
          function syncNodeFrom(from, to, ctx) {
              let type = from.nodeType;

              // if is an element type, sync the attributes from the
              // new node into the new node
              if (type === 1 /* element type */) {
                  const fromAttributes = from.attributes;
                  const toAttributes = to.attributes;
                  for (const fromAttribute of fromAttributes) {
                      if (ignoreAttribute(fromAttribute.name, to, 'update', ctx)) {
                          continue;
                      }
                      if (to.getAttribute(fromAttribute.name) !== fromAttribute.value) {
                          to.setAttribute(fromAttribute.name, fromAttribute.value);
                      }
                  }
                  // iterate backwards to avoid skipping over items when a delete occurs
                  for (let i = toAttributes.length - 1; 0 <= i; i--) {
                      const toAttribute = toAttributes[i];
                      if (ignoreAttribute(toAttribute.name, to, 'remove', ctx)) {
                          continue;
                      }
                      if (!from.hasAttribute(toAttribute.name)) {
                          to.removeAttribute(toAttribute.name);
                      }
                  }
              }

              // sync text nodes
              if (type === 8 /* comment */ || type === 3 /* text */) {
                  if (to.nodeValue !== from.nodeValue) {
                      to.nodeValue = from.nodeValue;
                  }
              }

              if (!ignoreValueOfActiveElement(to, ctx)) {
                  // sync input values
                  syncInputValue(from, to, ctx);
              }
          }

          /**
           * @param from {Element} element to sync the value from
           * @param to {Element} element to sync the value to
           * @param attributeName {String} the attribute name
           * @param ctx the merge context
           */
          function syncBooleanAttribute(from, to, attributeName, ctx) {
              if (from[attributeName] !== to[attributeName]) {
                  let ignoreUpdate = ignoreAttribute(attributeName, to, 'update', ctx);
                  if (!ignoreUpdate) {
                      to[attributeName] = from[attributeName];
                  }
                  if (from[attributeName]) {
                      if (!ignoreUpdate) {
                          to.setAttribute(attributeName, from[attributeName]);
                      }
                  } else {
                      if (!ignoreAttribute(attributeName, to, 'remove', ctx)) {
                          to.removeAttribute(attributeName);
                      }
                  }
              }
          }

          /**
           * NB: many bothans died to bring us information:
           *
           *  https://github.com/patrick-steele-idem/morphdom/blob/master/src/specialElHandlers.js
           *  https://github.com/choojs/nanomorph/blob/master/lib/morph.jsL113
           *
           * @param from {Element} the element to sync the input value from
           * @param to {Element} the element to sync the input value to
           * @param ctx the merge context
           */
          function syncInputValue(from, to, ctx) {
              if (from instanceof HTMLInputElement &&
                  to instanceof HTMLInputElement &&
                  from.type !== 'file') {

                  let fromValue = from.value;
                  let toValue = to.value;

                  // sync boolean attributes
                  syncBooleanAttribute(from, to, 'checked', ctx);
                  syncBooleanAttribute(from, to, 'disabled', ctx);

                  if (!from.hasAttribute('value')) {
                      if (!ignoreAttribute('value', to, 'remove', ctx)) {
                          to.value = '';
                          to.removeAttribute('value');
                      }
                  } else if (fromValue !== toValue) {
                      if (!ignoreAttribute('value', to, 'update', ctx)) {
                          to.setAttribute('value', fromValue);
                          to.value = fromValue;
                      }
                  }
              } else if (from instanceof HTMLOptionElement) {
                  syncBooleanAttribute(from, to, 'selected', ctx);
              } else if (from instanceof HTMLTextAreaElement && to instanceof HTMLTextAreaElement) {
                  let fromValue = from.value;
                  let toValue = to.value;
                  if (ignoreAttribute('value', to, 'update', ctx)) {
                      return;
                  }
                  if (fromValue !== toValue) {
                      to.value = fromValue;
                  }
                  if (to.firstChild && to.firstChild.nodeValue !== fromValue) {
                      to.firstChild.nodeValue = fromValue;
                  }
              }
          }

          //=============================================================================
          // the HEAD tag can be handled specially, either w/ a 'merge' or 'append' style
          //=============================================================================
          function handleHeadElement(newHeadTag, currentHead, ctx) {

              let added = [];
              let removed = [];
              let preserved = [];
              let nodesToAppend = [];

              let headMergeStyle = ctx.head.style;

              // put all new head elements into a Map, by their outerHTML
              let srcToNewHeadNodes = new Map();
              for (const newHeadChild of newHeadTag.children) {
                  srcToNewHeadNodes.set(newHeadChild.outerHTML, newHeadChild);
              }

              // for each elt in the current head
              for (const currentHeadElt of currentHead.children) {

                  // If the current head element is in the map
                  let inNewContent = srcToNewHeadNodes.has(currentHeadElt.outerHTML);
                  let isReAppended = ctx.head.shouldReAppend(currentHeadElt);
                  let isPreserved = ctx.head.shouldPreserve(currentHeadElt);
                  if (inNewContent || isPreserved) {
                      if (isReAppended) {
                          // remove the current version and let the new version replace it and re-execute
                          removed.push(currentHeadElt);
                      } else {
                          // this element already exists and should not be re-appended, so remove it from
                          // the new content map, preserving it in the DOM
                          srcToNewHeadNodes.delete(currentHeadElt.outerHTML);
                          preserved.push(currentHeadElt);
                      }
                  } else {
                      if (headMergeStyle === "append") {
                          // we are appending and this existing element is not new content
                          // so if and only if it is marked for re-append do we do anything
                          if (isReAppended) {
                              removed.push(currentHeadElt);
                              nodesToAppend.push(currentHeadElt);
                          }
                      } else {
                          // if this is a merge, we remove this content since it is not in the new head
                          if (ctx.head.shouldRemove(currentHeadElt) !== false) {
                              removed.push(currentHeadElt);
                          }
                      }
                  }
              }

              // Push the remaining new head elements in the Map into the
              // nodes to append to the head tag
              nodesToAppend.push(...srcToNewHeadNodes.values());

              let promises = [];
              for (const newNode of nodesToAppend) {
                  let newElt = document.createRange().createContextualFragment(newNode.outerHTML).firstChild;
                  if (ctx.callbacks.beforeNodeAdded(newElt) !== false) {
                      if (newElt.href || newElt.src) {
                          let resolve = null;
                          let promise = new Promise(function (_resolve) {
                              resolve = _resolve;
                          });
                          newElt.addEventListener('load', function () {
                              resolve();
                          });
                          promises.push(promise);
                      }
                      currentHead.appendChild(newElt);
                      ctx.callbacks.afterNodeAdded(newElt);
                      added.push(newElt);
                  }
              }

              // remove all removed elements, after we have appended the new elements to avoid
              // additional network requests for things like style sheets
              for (const removedElement of removed) {
                  if (ctx.callbacks.beforeNodeRemoved(removedElement) !== false) {
                      currentHead.removeChild(removedElement);
                      ctx.callbacks.afterNodeRemoved(removedElement);
                  }
              }

              ctx.head.afterHeadMorphed(currentHead, {added: added, kept: preserved, removed: removed});
              return promises;
          }

          function noOp() {
          }

          /*
            Deep merges the config object and the Idiomoroph.defaults object to
            produce a final configuration object
           */
          function mergeDefaults(config) {
              let finalConfig = {};
              // copy top level stuff into final config
              Object.assign(finalConfig, defaults);
              Object.assign(finalConfig, config);

              // copy callbacks into final config (do this to deep merge the callbacks)
              finalConfig.callbacks = {};
              Object.assign(finalConfig.callbacks, defaults.callbacks);
              Object.assign(finalConfig.callbacks, config.callbacks);

              // copy head config into final config  (do this to deep merge the head)
              finalConfig.head = {};
              Object.assign(finalConfig.head, defaults.head);
              Object.assign(finalConfig.head, config.head);
              return finalConfig;
          }

          function createMorphContext(oldNode, newContent, config) {
              config = mergeDefaults(config);
              return {
                  target: oldNode,
                  newContent: newContent,
                  config: config,
                  morphStyle: config.morphStyle,
                  ignoreActive: config.ignoreActive,
                  ignoreActiveValue: config.ignoreActiveValue,
                  idMap: createIdMap(oldNode, newContent),
                  deadIds: new Set(),
                  callbacks: config.callbacks,
                  head: config.head
              }
          }

          function isIdSetMatch(node1, node2, ctx) {
              if (node1 == null || node2 == null) {
                  return false;
              }
              if (node1.nodeType === node2.nodeType && node1.tagName === node2.tagName) {
                  if (node1.id !== "" && node1.id === node2.id) {
                      return true;
                  } else {
                      return getIdIntersectionCount(ctx, node1, node2) > 0;
                  }
              }
              return false;
          }

          function isSoftMatch(node1, node2) {
              if (node1 == null || node2 == null) {
                  return false;
              }
              return node1.nodeType === node2.nodeType && node1.tagName === node2.tagName
          }

          function removeNodesBetween(startInclusive, endExclusive, ctx) {
              while (startInclusive !== endExclusive) {
                  let tempNode = startInclusive;
                  startInclusive = startInclusive.nextSibling;
                  removeNode(tempNode, ctx);
              }
              removeIdsFromConsideration(ctx, endExclusive);
              return endExclusive.nextSibling;
          }

          //=============================================================================
          // Scans forward from the insertionPoint in the old parent looking for a potential id match
          // for the newChild.  We stop if we find a potential id match for the new child OR
          // if the number of potential id matches we are discarding is greater than the
          // potential id matches for the new child
          //=============================================================================
          function findIdSetMatch(newContent, oldParent, newChild, insertionPoint, ctx) {

              // max id matches we are willing to discard in our search
              let newChildPotentialIdCount = getIdIntersectionCount(ctx, newChild, oldParent);

              let potentialMatch = null;

              // only search forward if there is a possibility of an id match
              if (newChildPotentialIdCount > 0) {
                  let potentialMatch = insertionPoint;
                  // if there is a possibility of an id match, scan forward
                  // keep track of the potential id match count we are discarding (the
                  // newChildPotentialIdCount must be greater than this to make it likely
                  // worth it)
                  let otherMatchCount = 0;
                  while (potentialMatch != null) {

                      // If we have an id match, return the current potential match
                      if (isIdSetMatch(newChild, potentialMatch, ctx)) {
                          return potentialMatch;
                      }

                      // computer the other potential matches of this new content
                      otherMatchCount += getIdIntersectionCount(ctx, potentialMatch, newContent);
                      if (otherMatchCount > newChildPotentialIdCount) {
                          // if we have more potential id matches in _other_ content, we
                          // do not have a good candidate for an id match, so return null
                          return null;
                      }

                      // advanced to the next old content child
                      potentialMatch = potentialMatch.nextSibling;
                  }
              }
              return potentialMatch;
          }

          //=============================================================================
          // Scans forward from the insertionPoint in the old parent looking for a potential soft match
          // for the newChild.  We stop if we find a potential soft match for the new child OR
          // if we find a potential id match in the old parents children OR if we find two
          // potential soft matches for the next two pieces of new content
          //=============================================================================
          function findSoftMatch(newContent, oldParent, newChild, insertionPoint, ctx) {

              let potentialSoftMatch = insertionPoint;
              let nextSibling = newChild.nextSibling;
              let siblingSoftMatchCount = 0;

              while (potentialSoftMatch != null) {

                  if (getIdIntersectionCount(ctx, potentialSoftMatch, newContent) > 0) {
                      // the current potential soft match has a potential id set match with the remaining new
                      // content so bail out of looking
                      return null;
                  }

                  // if we have a soft match with the current node, return it
                  if (isSoftMatch(newChild, potentialSoftMatch)) {
                      return potentialSoftMatch;
                  }

                  if (isSoftMatch(nextSibling, potentialSoftMatch)) {
                      // the next new node has a soft match with this node, so
                      // increment the count of future soft matches
                      siblingSoftMatchCount++;
                      nextSibling = nextSibling.nextSibling;

                      // If there are two future soft matches, bail to allow the siblings to soft match
                      // so that we don't consume future soft matches for the sake of the current node
                      if (siblingSoftMatchCount >= 2) {
                          return null;
                      }
                  }

                  // advanced to the next old content child
                  potentialSoftMatch = potentialSoftMatch.nextSibling;
              }

              return potentialSoftMatch;
          }

          function parseContent(newContent) {
              let parser = new DOMParser();

              // remove svgs to avoid false-positive matches on head, etc.
              let contentWithSvgsRemoved = newContent.replace(/<svg(\s[^>]*>|>)([\s\S]*?)<\/svg>/gim, '');

              // if the newContent contains a html, head or body tag, we can simply parse it w/o wrapping
              if (contentWithSvgsRemoved.match(/<\/html>/) || contentWithSvgsRemoved.match(/<\/head>/) || contentWithSvgsRemoved.match(/<\/body>/)) {
                  let content = parser.parseFromString(newContent, "text/html");
                  // if it is a full HTML document, return the document itself as the parent container
                  if (contentWithSvgsRemoved.match(/<\/html>/)) {
                      content.generatedByIdiomorph = true;
                      return content;
                  } else {
                      // otherwise return the html element as the parent container
                      let htmlElement = content.firstChild;
                      if (htmlElement) {
                          htmlElement.generatedByIdiomorph = true;
                          return htmlElement;
                      } else {
                          return null;
                      }
                  }
              } else {
                  // if it is partial HTML, wrap it in a template tag to provide a parent element and also to help
                  // deal with touchy tags like tr, tbody, etc.
                  let responseDoc = parser.parseFromString("<body><template>" + newContent + "</template></body>", "text/html");
                  let content = responseDoc.body.querySelector('template').content;
                  content.generatedByIdiomorph = true;
                  return content
              }
          }

          function normalizeContent(newContent) {
              if (newContent == null) {
                  // noinspection UnnecessaryLocalVariableJS
                  const dummyParent = document.createElement('div');
                  return dummyParent;
              } else if (newContent.generatedByIdiomorph) {
                  // the template tag created by idiomorph parsing can serve as a dummy parent
                  return newContent;
              } else if (newContent instanceof Node) {
                  // a single node is added as a child to a dummy parent
                  const dummyParent = document.createElement('div');
                  dummyParent.append(newContent);
                  return dummyParent;
              } else {
                  // all nodes in the array or HTMLElement collection are consolidated under
                  // a single dummy parent element
                  const dummyParent = document.createElement('div');
                  for (const elt of [...newContent]) {
                      dummyParent.append(elt);
                  }
                  return dummyParent;
              }
          }

          function insertSiblings(previousSibling, morphedNode, nextSibling) {
              let stack = [];
              let added = [];
              while (previousSibling != null) {
                  stack.push(previousSibling);
                  previousSibling = previousSibling.previousSibling;
              }
              while (stack.length > 0) {
                  let node = stack.pop();
                  added.push(node); // push added preceding siblings on in order and insert
                  morphedNode.parentElement.insertBefore(node, morphedNode);
              }
              added.push(morphedNode);
              while (nextSibling != null) {
                  stack.push(nextSibling);
                  added.push(nextSibling); // here we are going in order, so push on as we scan, rather than add
                  nextSibling = nextSibling.nextSibling;
              }
              while (stack.length > 0) {
                  morphedNode.parentElement.insertBefore(stack.pop(), morphedNode.nextSibling);
              }
              return added;
          }

          function findBestNodeMatch(newContent, oldNode, ctx) {
              let currentElement;
              currentElement = newContent.firstChild;
              let bestElement = currentElement;
              let score = 0;
              while (currentElement) {
                  let newScore = scoreElement(currentElement, oldNode, ctx);
                  if (newScore > score) {
                      bestElement = currentElement;
                      score = newScore;
                  }
                  currentElement = currentElement.nextSibling;
              }
              return bestElement;
          }

          function scoreElement(node1, node2, ctx) {
              if (isSoftMatch(node1, node2)) {
                  return .5 + getIdIntersectionCount(ctx, node1, node2);
              }
              return 0;
          }

          function removeNode(tempNode, ctx) {
              removeIdsFromConsideration(ctx, tempNode);
              if (ctx.callbacks.beforeNodeRemoved(tempNode) === false) return;

              tempNode.remove();
              ctx.callbacks.afterNodeRemoved(tempNode);
          }

          //=============================================================================
          // ID Set Functions
          //=============================================================================

          function isIdInConsideration(ctx, id) {
              return !ctx.deadIds.has(id);
          }

          function idIsWithinNode(ctx, id, targetNode) {
              let idSet = ctx.idMap.get(targetNode) || EMPTY_SET;
              return idSet.has(id);
          }

          function removeIdsFromConsideration(ctx, node) {
              let idSet = ctx.idMap.get(node) || EMPTY_SET;
              for (const id of idSet) {
                  ctx.deadIds.add(id);
              }
          }

          function getIdIntersectionCount(ctx, node1, node2) {
              let sourceSet = ctx.idMap.get(node1) || EMPTY_SET;
              let matchCount = 0;
              for (const id of sourceSet) {
                  // a potential match is an id in the source and potentialIdsSet, but
                  // that has not already been merged into the DOM
                  if (isIdInConsideration(ctx, id) && idIsWithinNode(ctx, id, node2)) {
                      ++matchCount;
                  }
              }
              return matchCount;
          }

          /**
           * A bottom up algorithm that finds all elements with ids inside of the node
           * argument and populates id sets for those nodes and all their parents, generating
           * a set of ids contained within all nodes for the entire hierarchy in the DOM
           *
           * @param node {Element}
           * @param {Map<Node, Set<String>>} idMap
           */
          function populateIdMapForNode(node, idMap) {
              let nodeParent = node.parentElement;
              // find all elements with an id property
              let idElements = node.querySelectorAll('[id]');
              for (const elt of idElements) {
                  let current = elt;
                  // walk up the parent hierarchy of that element, adding the id
                  // of element to the parent's id set
                  while (current !== nodeParent && current != null) {
                      let idSet = idMap.get(current);
                      // if the id set doesn't exist, create it and insert it in the  map
                      if (idSet == null) {
                          idSet = new Set();
                          idMap.set(current, idSet);
                      }
                      idSet.add(elt.id);
                      current = current.parentElement;
                  }
              }
          }

          /**
           * This function computes a map of nodes to all ids contained within that node (inclusive of the
           * node).  This map can be used to ask if two nodes have intersecting sets of ids, which allows
           * for a looser definition of "matching" than tradition id matching, and allows child nodes
           * to contribute to a parent nodes matching.
           *
           * @param {Element} oldContent  the old content that will be morphed
           * @param {Element} newContent  the new content to morph to
           * @returns {Map<Node, Set<String>>} a map of nodes to id sets for the
           */
          function createIdMap(oldContent, newContent) {
              let idMap = new Map();
              populateIdMapForNode(oldContent, idMap);
              populateIdMapForNode(newContent, idMap);
              return idMap;
          }

          //=============================================================================
          // This is what ends up becoming the Idiomorph global object
          //=============================================================================
          return {
              morph,
              defaults
          }
      })();

  /*
  Stimulus 3.2.1
  Copyright © 2023 Basecamp, LLC
   */
  class EventListener {
      constructor(eventTarget, eventName, eventOptions) {
          this.eventTarget = eventTarget;
          this.eventName = eventName;
          this.eventOptions = eventOptions;
          this.unorderedBindings = new Set();
      }
      connect() {
          this.eventTarget.addEventListener(this.eventName, this, this.eventOptions);
      }
      disconnect() {
          this.eventTarget.removeEventListener(this.eventName, this, this.eventOptions);
      }
      bindingConnected(binding) {
          this.unorderedBindings.add(binding);
      }
      bindingDisconnected(binding) {
          this.unorderedBindings.delete(binding);
      }
      handleEvent(event) {
          const extendedEvent = extendEvent(event);
          for (const binding of this.bindings) {
              if (extendedEvent.immediatePropagationStopped) {
                  break;
              }
              else {
                  binding.handleEvent(extendedEvent);
              }
          }
      }
      hasBindings() {
          return this.unorderedBindings.size > 0;
      }
      get bindings() {
          return Array.from(this.unorderedBindings).sort((left, right) => {
              const leftIndex = left.index, rightIndex = right.index;
              return leftIndex < rightIndex ? -1 : leftIndex > rightIndex ? 1 : 0;
          });
      }
  }
  function extendEvent(event) {
      if ("immediatePropagationStopped" in event) {
          return event;
      }
      else {
          const { stopImmediatePropagation } = event;
          return Object.assign(event, {
              immediatePropagationStopped: false,
              stopImmediatePropagation() {
                  this.immediatePropagationStopped = true;
                  stopImmediatePropagation.call(this);
              },
          });
      }
  }

  class Dispatcher {
      constructor(application) {
          this.application = application;
          this.eventListenerMaps = new Map();
          this.started = false;
      }
      start() {
          if (!this.started) {
              this.started = true;
              this.eventListeners.forEach((eventListener) => eventListener.connect());
          }
      }
      stop() {
          if (this.started) {
              this.started = false;
              this.eventListeners.forEach((eventListener) => eventListener.disconnect());
          }
      }
      get eventListeners() {
          return Array.from(this.eventListenerMaps.values()).reduce((listeners, map) => listeners.concat(Array.from(map.values())), []);
      }
      bindingConnected(binding) {
          this.fetchEventListenerForBinding(binding).bindingConnected(binding);
      }
      bindingDisconnected(binding, clearEventListeners = false) {
          this.fetchEventListenerForBinding(binding).bindingDisconnected(binding);
          if (clearEventListeners)
              this.clearEventListenersForBinding(binding);
      }
      handleError(error, message, detail = {}) {
          this.application.handleError(error, `Error ${message}`, detail);
      }
      clearEventListenersForBinding(binding) {
          const eventListener = this.fetchEventListenerForBinding(binding);
          if (!eventListener.hasBindings()) {
              eventListener.disconnect();
              this.removeMappedEventListenerFor(binding);
          }
      }
      removeMappedEventListenerFor(binding) {
          const { eventTarget, eventName, eventOptions } = binding;
          const eventListenerMap = this.fetchEventListenerMapForEventTarget(eventTarget);
          const cacheKey = this.cacheKey(eventName, eventOptions);
          eventListenerMap.delete(cacheKey);
          if (eventListenerMap.size == 0)
              this.eventListenerMaps.delete(eventTarget);
      }
      fetchEventListenerForBinding(binding) {
          const { eventTarget, eventName, eventOptions } = binding;
          return this.fetchEventListener(eventTarget, eventName, eventOptions);
      }
      fetchEventListener(eventTarget, eventName, eventOptions) {
          const eventListenerMap = this.fetchEventListenerMapForEventTarget(eventTarget);
          const cacheKey = this.cacheKey(eventName, eventOptions);
          let eventListener = eventListenerMap.get(cacheKey);
          if (!eventListener) {
              eventListener = this.createEventListener(eventTarget, eventName, eventOptions);
              eventListenerMap.set(cacheKey, eventListener);
          }
          return eventListener;
      }
      createEventListener(eventTarget, eventName, eventOptions) {
          const eventListener = new EventListener(eventTarget, eventName, eventOptions);
          if (this.started) {
              eventListener.connect();
          }
          return eventListener;
      }
      fetchEventListenerMapForEventTarget(eventTarget) {
          let eventListenerMap = this.eventListenerMaps.get(eventTarget);
          if (!eventListenerMap) {
              eventListenerMap = new Map();
              this.eventListenerMaps.set(eventTarget, eventListenerMap);
          }
          return eventListenerMap;
      }
      cacheKey(eventName, eventOptions) {
          const parts = [eventName];
          Object.keys(eventOptions)
              .sort()
              .forEach((key) => {
              parts.push(`${eventOptions[key] ? "" : "!"}${key}`);
          });
          return parts.join(":");
      }
  }

  const defaultActionDescriptorFilters = {
      stop({ event, value }) {
          if (value)
              event.stopPropagation();
          return true;
      },
      prevent({ event, value }) {
          if (value)
              event.preventDefault();
          return true;
      },
      self({ event, value, element }) {
          if (value) {
              return element === event.target;
          }
          else {
              return true;
          }
      },
  };
  const descriptorPattern = /^(?:(?:([^.]+?)\+)?(.+?)(?:\.(.+?))?(?:@(window|document))?->)?(.+?)(?:#([^:]+?))(?::(.+))?$/;
  function parseActionDescriptorString(descriptorString) {
      const source = descriptorString.trim();
      const matches = source.match(descriptorPattern) || [];
      let eventName = matches[2];
      let keyFilter = matches[3];
      if (keyFilter && !["keydown", "keyup", "keypress"].includes(eventName)) {
          eventName += `.${keyFilter}`;
          keyFilter = "";
      }
      return {
          eventTarget: parseEventTarget(matches[4]),
          eventName,
          eventOptions: matches[7] ? parseEventOptions(matches[7]) : {},
          identifier: matches[5],
          methodName: matches[6],
          keyFilter: matches[1] || keyFilter,
      };
  }
  function parseEventTarget(eventTargetName) {
      if (eventTargetName == "window") {
          return window;
      }
      else if (eventTargetName == "document") {
          return document;
      }
  }
  function parseEventOptions(eventOptions) {
      return eventOptions
          .split(":")
          .reduce((options, token) => Object.assign(options, { [token.replace(/^!/, "")]: !/^!/.test(token) }), {});
  }
  function stringifyEventTarget(eventTarget) {
      if (eventTarget == window) {
          return "window";
      }
      else if (eventTarget == document) {
          return "document";
      }
  }

  function camelize(value) {
      return value.replace(/(?:[_-])([a-z0-9])/g, (_, char) => char.toUpperCase());
  }
  function namespaceCamelize(value) {
      return camelize(value.replace(/--/g, "-").replace(/__/g, "_"));
  }
  function capitalize(value) {
      return value.charAt(0).toUpperCase() + value.slice(1);
  }
  function dasherize(value) {
      return value.replace(/([A-Z])/g, (_, char) => `-${char.toLowerCase()}`);
  }
  function tokenize(value) {
      return value.match(/[^\s]+/g) || [];
  }
  function hasProperty(object, property) {
      return Object.prototype.hasOwnProperty.call(object, property);
  }

  const allModifiers = ["meta", "ctrl", "alt", "shift"];
  class Action {
      constructor(element, index, descriptor, schema) {
          this.element = element;
          this.index = index;
          this.eventTarget = descriptor.eventTarget || element;
          this.eventName = descriptor.eventName || getDefaultEventNameForElement(element) || error("missing event name");
          this.eventOptions = descriptor.eventOptions || {};
          this.identifier = descriptor.identifier || error("missing identifier");
          this.methodName = descriptor.methodName || error("missing method name");
          this.keyFilter = descriptor.keyFilter || "";
          this.schema = schema;
      }
      static forToken(token, schema) {
          return new this(token.element, token.index, parseActionDescriptorString(token.content), schema);
      }
      toString() {
          const eventFilter = this.keyFilter ? `.${this.keyFilter}` : "";
          const eventTarget = this.eventTargetName ? `@${this.eventTargetName}` : "";
          return `${this.eventName}${eventFilter}${eventTarget}->${this.identifier}#${this.methodName}`;
      }
      shouldIgnoreKeyboardEvent(event) {
          if (!this.keyFilter) {
              return false;
          }
          const filters = this.keyFilter.split("+");
          if (this.keyFilterDissatisfied(event, filters)) {
              return true;
          }
          const standardFilter = filters.filter((key) => !allModifiers.includes(key))[0];
          if (!standardFilter) {
              return false;
          }
          if (!hasProperty(this.keyMappings, standardFilter)) {
              error(`contains unknown key filter: ${this.keyFilter}`);
          }
          return this.keyMappings[standardFilter].toLowerCase() !== event.key.toLowerCase();
      }
      shouldIgnoreMouseEvent(event) {
          if (!this.keyFilter) {
              return false;
          }
          const filters = [this.keyFilter];
          if (this.keyFilterDissatisfied(event, filters)) {
              return true;
          }
          return false;
      }
      get params() {
          const params = {};
          const pattern = new RegExp(`^data-${this.identifier}-(.+)-param$`, "i");
          for (const { name, value } of Array.from(this.element.attributes)) {
              const match = name.match(pattern);
              const key = match && match[1];
              if (key) {
                  params[camelize(key)] = typecast(value);
              }
          }
          return params;
      }
      get eventTargetName() {
          return stringifyEventTarget(this.eventTarget);
      }
      get keyMappings() {
          return this.schema.keyMappings;
      }
      keyFilterDissatisfied(event, filters) {
          const [meta, ctrl, alt, shift] = allModifiers.map((modifier) => filters.includes(modifier));
          return event.metaKey !== meta || event.ctrlKey !== ctrl || event.altKey !== alt || event.shiftKey !== shift;
      }
  }
  const defaultEventNames = {
      a: () => "click",
      button: () => "click",
      form: () => "submit",
      details: () => "toggle",
      input: (e) => (e.getAttribute("type") == "submit" ? "click" : "input"),
      select: () => "change",
      textarea: () => "input",
  };
  function getDefaultEventNameForElement(element) {
      const tagName = element.tagName.toLowerCase();
      if (tagName in defaultEventNames) {
          return defaultEventNames[tagName](element);
      }
  }
  function error(message) {
      throw new Error(message);
  }
  function typecast(value) {
      try {
          return JSON.parse(value);
      }
      catch (o_O) {
          return value;
      }
  }

  class Binding {
      constructor(context, action) {
          this.context = context;
          this.action = action;
      }
      get index() {
          return this.action.index;
      }
      get eventTarget() {
          return this.action.eventTarget;
      }
      get eventOptions() {
          return this.action.eventOptions;
      }
      get identifier() {
          return this.context.identifier;
      }
      handleEvent(event) {
          const actionEvent = this.prepareActionEvent(event);
          if (this.willBeInvokedByEvent(event) && this.applyEventModifiers(actionEvent)) {
              this.invokeWithEvent(actionEvent);
          }
      }
      get eventName() {
          return this.action.eventName;
      }
      get method() {
          const method = this.controller[this.methodName];
          if (typeof method == "function") {
              return method;
          }
          throw new Error(`Action "${this.action}" references undefined method "${this.methodName}"`);
      }
      applyEventModifiers(event) {
          const { element } = this.action;
          const { actionDescriptorFilters } = this.context.application;
          const { controller } = this.context;
          let passes = true;
          for (const [name, value] of Object.entries(this.eventOptions)) {
              if (name in actionDescriptorFilters) {
                  const filter = actionDescriptorFilters[name];
                  passes = passes && filter({ name, value, event, element, controller });
              }
              else {
                  continue;
              }
          }
          return passes;
      }
      prepareActionEvent(event) {
          return Object.assign(event, { params: this.action.params });
      }
      invokeWithEvent(event) {
          const { target, currentTarget } = event;
          try {
              this.method.call(this.controller, event);
              this.context.logDebugActivity(this.methodName, { event, target, currentTarget, action: this.methodName });
          }
          catch (error) {
              const { identifier, controller, element, index } = this;
              const detail = { identifier, controller, element, index, event };
              this.context.handleError(error, `invoking action "${this.action}"`, detail);
          }
      }
      willBeInvokedByEvent(event) {
          const eventTarget = event.target;
          if (event instanceof KeyboardEvent && this.action.shouldIgnoreKeyboardEvent(event)) {
              return false;
          }
          if (event instanceof MouseEvent && this.action.shouldIgnoreMouseEvent(event)) {
              return false;
          }
          if (this.element === eventTarget) {
              return true;
          }
          else if (eventTarget instanceof Element && this.element.contains(eventTarget)) {
              return this.scope.containsElement(eventTarget);
          }
          else {
              return this.scope.containsElement(this.action.element);
          }
      }
      get controller() {
          return this.context.controller;
      }
      get methodName() {
          return this.action.methodName;
      }
      get element() {
          return this.scope.element;
      }
      get scope() {
          return this.context.scope;
      }
  }

  class ElementObserver {
      constructor(element, delegate) {
          this.mutationObserverInit = { attributes: true, childList: true, subtree: true };
          this.element = element;
          this.started = false;
          this.delegate = delegate;
          this.elements = new Set();
          this.mutationObserver = new MutationObserver((mutations) => this.processMutations(mutations));
      }
      start() {
          if (!this.started) {
              this.started = true;
              this.mutationObserver.observe(this.element, this.mutationObserverInit);
              this.refresh();
          }
      }
      pause(callback) {
          if (this.started) {
              this.mutationObserver.disconnect();
              this.started = false;
          }
          callback();
          if (!this.started) {
              this.mutationObserver.observe(this.element, this.mutationObserverInit);
              this.started = true;
          }
      }
      stop() {
          if (this.started) {
              this.mutationObserver.takeRecords();
              this.mutationObserver.disconnect();
              this.started = false;
          }
      }
      refresh() {
          if (this.started) {
              const matches = new Set(this.matchElementsInTree());
              for (const element of Array.from(this.elements)) {
                  if (!matches.has(element)) {
                      this.removeElement(element);
                  }
              }
              for (const element of Array.from(matches)) {
                  this.addElement(element);
              }
          }
      }
      processMutations(mutations) {
          if (this.started) {
              for (const mutation of mutations) {
                  this.processMutation(mutation);
              }
          }
      }
      processMutation(mutation) {
          if (mutation.type == "attributes") {
              this.processAttributeChange(mutation.target, mutation.attributeName);
          }
          else if (mutation.type == "childList") {
              this.processRemovedNodes(mutation.removedNodes);
              this.processAddedNodes(mutation.addedNodes);
          }
      }
      processAttributeChange(element, attributeName) {
          if (this.elements.has(element)) {
              if (this.delegate.elementAttributeChanged && this.matchElement(element)) {
                  this.delegate.elementAttributeChanged(element, attributeName);
              }
              else {
                  this.removeElement(element);
              }
          }
          else if (this.matchElement(element)) {
              this.addElement(element);
          }
      }
      processRemovedNodes(nodes) {
          for (const node of Array.from(nodes)) {
              const element = this.elementFromNode(node);
              if (element) {
                  this.processTree(element, this.removeElement);
              }
          }
      }
      processAddedNodes(nodes) {
          for (const node of Array.from(nodes)) {
              const element = this.elementFromNode(node);
              if (element && this.elementIsActive(element)) {
                  this.processTree(element, this.addElement);
              }
          }
      }
      matchElement(element) {
          return this.delegate.matchElement(element);
      }
      matchElementsInTree(tree = this.element) {
          return this.delegate.matchElementsInTree(tree);
      }
      processTree(tree, processor) {
          for (const element of this.matchElementsInTree(tree)) {
              processor.call(this, element);
          }
      }
      elementFromNode(node) {
          if (node.nodeType == Node.ELEMENT_NODE) {
              return node;
          }
      }
      elementIsActive(element) {
          if (element.isConnected != this.element.isConnected) {
              return false;
          }
          else {
              return this.element.contains(element);
          }
      }
      addElement(element) {
          if (!this.elements.has(element)) {
              if (this.elementIsActive(element)) {
                  this.elements.add(element);
                  if (this.delegate.elementMatched) {
                      this.delegate.elementMatched(element);
                  }
              }
          }
      }
      removeElement(element) {
          if (this.elements.has(element)) {
              this.elements.delete(element);
              if (this.delegate.elementUnmatched) {
                  this.delegate.elementUnmatched(element);
              }
          }
      }
  }

  class AttributeObserver {
      constructor(element, attributeName, delegate) {
          this.attributeName = attributeName;
          this.delegate = delegate;
          this.elementObserver = new ElementObserver(element, this);
      }
      get element() {
          return this.elementObserver.element;
      }
      get selector() {
          return `[${this.attributeName}]`;
      }
      start() {
          this.elementObserver.start();
      }
      pause(callback) {
          this.elementObserver.pause(callback);
      }
      stop() {
          this.elementObserver.stop();
      }
      refresh() {
          this.elementObserver.refresh();
      }
      get started() {
          return this.elementObserver.started;
      }
      matchElement(element) {
          return element.hasAttribute(this.attributeName);
      }
      matchElementsInTree(tree) {
          const match = this.matchElement(tree) ? [tree] : [];
          const matches = Array.from(tree.querySelectorAll(this.selector));
          return match.concat(matches);
      }
      elementMatched(element) {
          if (this.delegate.elementMatchedAttribute) {
              this.delegate.elementMatchedAttribute(element, this.attributeName);
          }
      }
      elementUnmatched(element) {
          if (this.delegate.elementUnmatchedAttribute) {
              this.delegate.elementUnmatchedAttribute(element, this.attributeName);
          }
      }
      elementAttributeChanged(element, attributeName) {
          if (this.delegate.elementAttributeValueChanged && this.attributeName == attributeName) {
              this.delegate.elementAttributeValueChanged(element, attributeName);
          }
      }
  }

  function add(map, key, value) {
      fetch$1(map, key).add(value);
  }
  function del(map, key, value) {
      fetch$1(map, key).delete(value);
      prune(map, key);
  }
  function fetch$1(map, key) {
      let values = map.get(key);
      if (!values) {
          values = new Set();
          map.set(key, values);
      }
      return values;
  }
  function prune(map, key) {
      const values = map.get(key);
      if (values != null && values.size == 0) {
          map.delete(key);
      }
  }

  class Multimap {
      constructor() {
          this.valuesByKey = new Map();
      }
      get keys() {
          return Array.from(this.valuesByKey.keys());
      }
      get values() {
          const sets = Array.from(this.valuesByKey.values());
          return sets.reduce((values, set) => values.concat(Array.from(set)), []);
      }
      get size() {
          const sets = Array.from(this.valuesByKey.values());
          return sets.reduce((size, set) => size + set.size, 0);
      }
      add(key, value) {
          add(this.valuesByKey, key, value);
      }
      delete(key, value) {
          del(this.valuesByKey, key, value);
      }
      has(key, value) {
          const values = this.valuesByKey.get(key);
          return values != null && values.has(value);
      }
      hasKey(key) {
          return this.valuesByKey.has(key);
      }
      hasValue(value) {
          const sets = Array.from(this.valuesByKey.values());
          return sets.some((set) => set.has(value));
      }
      getValuesForKey(key) {
          const values = this.valuesByKey.get(key);
          return values ? Array.from(values) : [];
      }
      getKeysForValue(value) {
          return Array.from(this.valuesByKey)
              .filter(([_key, values]) => values.has(value))
              .map(([key, _values]) => key);
      }
  }

  class SelectorObserver {
      constructor(element, selector, delegate, details) {
          this._selector = selector;
          this.details = details;
          this.elementObserver = new ElementObserver(element, this);
          this.delegate = delegate;
          this.matchesByElement = new Multimap();
      }
      get started() {
          return this.elementObserver.started;
      }
      get selector() {
          return this._selector;
      }
      set selector(selector) {
          this._selector = selector;
          this.refresh();
      }
      start() {
          this.elementObserver.start();
      }
      pause(callback) {
          this.elementObserver.pause(callback);
      }
      stop() {
          this.elementObserver.stop();
      }
      refresh() {
          this.elementObserver.refresh();
      }
      get element() {
          return this.elementObserver.element;
      }
      matchElement(element) {
          const { selector } = this;
          if (selector) {
              const matches = element.matches(selector);
              if (this.delegate.selectorMatchElement) {
                  return matches && this.delegate.selectorMatchElement(element, this.details);
              }
              return matches;
          }
          else {
              return false;
          }
      }
      matchElementsInTree(tree) {
          const { selector } = this;
          if (selector) {
              const match = this.matchElement(tree) ? [tree] : [];
              const matches = Array.from(tree.querySelectorAll(selector)).filter((match) => this.matchElement(match));
              return match.concat(matches);
          }
          else {
              return [];
          }
      }
      elementMatched(element) {
          const { selector } = this;
          if (selector) {
              this.selectorMatched(element, selector);
          }
      }
      elementUnmatched(element) {
          const selectors = this.matchesByElement.getKeysForValue(element);
          for (const selector of selectors) {
              this.selectorUnmatched(element, selector);
          }
      }
      elementAttributeChanged(element, _attributeName) {
          const { selector } = this;
          if (selector) {
              const matches = this.matchElement(element);
              const matchedBefore = this.matchesByElement.has(selector, element);
              if (matches && !matchedBefore) {
                  this.selectorMatched(element, selector);
              }
              else if (!matches && matchedBefore) {
                  this.selectorUnmatched(element, selector);
              }
          }
      }
      selectorMatched(element, selector) {
          this.delegate.selectorMatched(element, selector, this.details);
          this.matchesByElement.add(selector, element);
      }
      selectorUnmatched(element, selector) {
          this.delegate.selectorUnmatched(element, selector, this.details);
          this.matchesByElement.delete(selector, element);
      }
  }

  class StringMapObserver {
      constructor(element, delegate) {
          this.element = element;
          this.delegate = delegate;
          this.started = false;
          this.stringMap = new Map();
          this.mutationObserver = new MutationObserver((mutations) => this.processMutations(mutations));
      }
      start() {
          if (!this.started) {
              this.started = true;
              this.mutationObserver.observe(this.element, { attributes: true, attributeOldValue: true });
              this.refresh();
          }
      }
      stop() {
          if (this.started) {
              this.mutationObserver.takeRecords();
              this.mutationObserver.disconnect();
              this.started = false;
          }
      }
      refresh() {
          if (this.started) {
              for (const attributeName of this.knownAttributeNames) {
                  this.refreshAttribute(attributeName, null);
              }
          }
      }
      processMutations(mutations) {
          if (this.started) {
              for (const mutation of mutations) {
                  this.processMutation(mutation);
              }
          }
      }
      processMutation(mutation) {
          const attributeName = mutation.attributeName;
          if (attributeName) {
              this.refreshAttribute(attributeName, mutation.oldValue);
          }
      }
      refreshAttribute(attributeName, oldValue) {
          const key = this.delegate.getStringMapKeyForAttribute(attributeName);
          if (key != null) {
              if (!this.stringMap.has(attributeName)) {
                  this.stringMapKeyAdded(key, attributeName);
              }
              const value = this.element.getAttribute(attributeName);
              if (this.stringMap.get(attributeName) != value) {
                  this.stringMapValueChanged(value, key, oldValue);
              }
              if (value == null) {
                  const oldValue = this.stringMap.get(attributeName);
                  this.stringMap.delete(attributeName);
                  if (oldValue)
                      this.stringMapKeyRemoved(key, attributeName, oldValue);
              }
              else {
                  this.stringMap.set(attributeName, value);
              }
          }
      }
      stringMapKeyAdded(key, attributeName) {
          if (this.delegate.stringMapKeyAdded) {
              this.delegate.stringMapKeyAdded(key, attributeName);
          }
      }
      stringMapValueChanged(value, key, oldValue) {
          if (this.delegate.stringMapValueChanged) {
              this.delegate.stringMapValueChanged(value, key, oldValue);
          }
      }
      stringMapKeyRemoved(key, attributeName, oldValue) {
          if (this.delegate.stringMapKeyRemoved) {
              this.delegate.stringMapKeyRemoved(key, attributeName, oldValue);
          }
      }
      get knownAttributeNames() {
          return Array.from(new Set(this.currentAttributeNames.concat(this.recordedAttributeNames)));
      }
      get currentAttributeNames() {
          return Array.from(this.element.attributes).map((attribute) => attribute.name);
      }
      get recordedAttributeNames() {
          return Array.from(this.stringMap.keys());
      }
  }

  class TokenListObserver {
      constructor(element, attributeName, delegate) {
          this.attributeObserver = new AttributeObserver(element, attributeName, this);
          this.delegate = delegate;
          this.tokensByElement = new Multimap();
      }
      get started() {
          return this.attributeObserver.started;
      }
      start() {
          this.attributeObserver.start();
      }
      pause(callback) {
          this.attributeObserver.pause(callback);
      }
      stop() {
          this.attributeObserver.stop();
      }
      refresh() {
          this.attributeObserver.refresh();
      }
      get element() {
          return this.attributeObserver.element;
      }
      get attributeName() {
          return this.attributeObserver.attributeName;
      }
      elementMatchedAttribute(element) {
          this.tokensMatched(this.readTokensForElement(element));
      }
      elementAttributeValueChanged(element) {
          const [unmatchedTokens, matchedTokens] = this.refreshTokensForElement(element);
          this.tokensUnmatched(unmatchedTokens);
          this.tokensMatched(matchedTokens);
      }
      elementUnmatchedAttribute(element) {
          this.tokensUnmatched(this.tokensByElement.getValuesForKey(element));
      }
      tokensMatched(tokens) {
          tokens.forEach((token) => this.tokenMatched(token));
      }
      tokensUnmatched(tokens) {
          tokens.forEach((token) => this.tokenUnmatched(token));
      }
      tokenMatched(token) {
          this.delegate.tokenMatched(token);
          this.tokensByElement.add(token.element, token);
      }
      tokenUnmatched(token) {
          this.delegate.tokenUnmatched(token);
          this.tokensByElement.delete(token.element, token);
      }
      refreshTokensForElement(element) {
          const previousTokens = this.tokensByElement.getValuesForKey(element);
          const currentTokens = this.readTokensForElement(element);
          const firstDifferingIndex = zip(previousTokens, currentTokens).findIndex(([previousToken, currentToken]) => !tokensAreEqual(previousToken, currentToken));
          if (firstDifferingIndex == -1) {
              return [[], []];
          }
          else {
              return [previousTokens.slice(firstDifferingIndex), currentTokens.slice(firstDifferingIndex)];
          }
      }
      readTokensForElement(element) {
          const attributeName = this.attributeName;
          const tokenString = element.getAttribute(attributeName) || "";
          return parseTokenString(tokenString, element, attributeName);
      }
  }
  function parseTokenString(tokenString, element, attributeName) {
      return tokenString
          .trim()
          .split(/\s+/)
          .filter((content) => content.length)
          .map((content, index) => ({ element, attributeName, content, index }));
  }
  function zip(left, right) {
      const length = Math.max(left.length, right.length);
      return Array.from({ length }, (_, index) => [left[index], right[index]]);
  }
  function tokensAreEqual(left, right) {
      return left && right && left.index == right.index && left.content == right.content;
  }

  class ValueListObserver {
      constructor(element, attributeName, delegate) {
          this.tokenListObserver = new TokenListObserver(element, attributeName, this);
          this.delegate = delegate;
          this.parseResultsByToken = new WeakMap();
          this.valuesByTokenByElement = new WeakMap();
      }
      get started() {
          return this.tokenListObserver.started;
      }
      start() {
          this.tokenListObserver.start();
      }
      stop() {
          this.tokenListObserver.stop();
      }
      refresh() {
          this.tokenListObserver.refresh();
      }
      get element() {
          return this.tokenListObserver.element;
      }
      get attributeName() {
          return this.tokenListObserver.attributeName;
      }
      tokenMatched(token) {
          const { element } = token;
          const { value } = this.fetchParseResultForToken(token);
          if (value) {
              this.fetchValuesByTokenForElement(element).set(token, value);
              this.delegate.elementMatchedValue(element, value);
          }
      }
      tokenUnmatched(token) {
          const { element } = token;
          const { value } = this.fetchParseResultForToken(token);
          if (value) {
              this.fetchValuesByTokenForElement(element).delete(token);
              this.delegate.elementUnmatchedValue(element, value);
          }
      }
      fetchParseResultForToken(token) {
          let parseResult = this.parseResultsByToken.get(token);
          if (!parseResult) {
              parseResult = this.parseToken(token);
              this.parseResultsByToken.set(token, parseResult);
          }
          return parseResult;
      }
      fetchValuesByTokenForElement(element) {
          let valuesByToken = this.valuesByTokenByElement.get(element);
          if (!valuesByToken) {
              valuesByToken = new Map();
              this.valuesByTokenByElement.set(element, valuesByToken);
          }
          return valuesByToken;
      }
      parseToken(token) {
          try {
              const value = this.delegate.parseValueForToken(token);
              return { value };
          }
          catch (error) {
              return { error };
          }
      }
  }

  class BindingObserver {
      constructor(context, delegate) {
          this.context = context;
          this.delegate = delegate;
          this.bindingsByAction = new Map();
      }
      start() {
          if (!this.valueListObserver) {
              this.valueListObserver = new ValueListObserver(this.element, this.actionAttribute, this);
              this.valueListObserver.start();
          }
      }
      stop() {
          if (this.valueListObserver) {
              this.valueListObserver.stop();
              delete this.valueListObserver;
              this.disconnectAllActions();
          }
      }
      get element() {
          return this.context.element;
      }
      get identifier() {
          return this.context.identifier;
      }
      get actionAttribute() {
          return this.schema.actionAttribute;
      }
      get schema() {
          return this.context.schema;
      }
      get bindings() {
          return Array.from(this.bindingsByAction.values());
      }
      connectAction(action) {
          const binding = new Binding(this.context, action);
          this.bindingsByAction.set(action, binding);
          this.delegate.bindingConnected(binding);
      }
      disconnectAction(action) {
          const binding = this.bindingsByAction.get(action);
          if (binding) {
              this.bindingsByAction.delete(action);
              this.delegate.bindingDisconnected(binding);
          }
      }
      disconnectAllActions() {
          this.bindings.forEach((binding) => this.delegate.bindingDisconnected(binding, true));
          this.bindingsByAction.clear();
      }
      parseValueForToken(token) {
          const action = Action.forToken(token, this.schema);
          if (action.identifier == this.identifier) {
              return action;
          }
      }
      elementMatchedValue(element, action) {
          this.connectAction(action);
      }
      elementUnmatchedValue(element, action) {
          this.disconnectAction(action);
      }
  }

  class ValueObserver {
      constructor(context, receiver) {
          this.context = context;
          this.receiver = receiver;
          this.stringMapObserver = new StringMapObserver(this.element, this);
          this.valueDescriptorMap = this.controller.valueDescriptorMap;
      }
      start() {
          this.stringMapObserver.start();
          this.invokeChangedCallbacksForDefaultValues();
      }
      stop() {
          this.stringMapObserver.stop();
      }
      get element() {
          return this.context.element;
      }
      get controller() {
          return this.context.controller;
      }
      getStringMapKeyForAttribute(attributeName) {
          if (attributeName in this.valueDescriptorMap) {
              return this.valueDescriptorMap[attributeName].name;
          }
      }
      stringMapKeyAdded(key, attributeName) {
          const descriptor = this.valueDescriptorMap[attributeName];
          if (!this.hasValue(key)) {
              this.invokeChangedCallback(key, descriptor.writer(this.receiver[key]), descriptor.writer(descriptor.defaultValue));
          }
      }
      stringMapValueChanged(value, name, oldValue) {
          const descriptor = this.valueDescriptorNameMap[name];
          if (value === null)
              return;
          if (oldValue === null) {
              oldValue = descriptor.writer(descriptor.defaultValue);
          }
          this.invokeChangedCallback(name, value, oldValue);
      }
      stringMapKeyRemoved(key, attributeName, oldValue) {
          const descriptor = this.valueDescriptorNameMap[key];
          if (this.hasValue(key)) {
              this.invokeChangedCallback(key, descriptor.writer(this.receiver[key]), oldValue);
          }
          else {
              this.invokeChangedCallback(key, descriptor.writer(descriptor.defaultValue), oldValue);
          }
      }
      invokeChangedCallbacksForDefaultValues() {
          for (const { key, name, defaultValue, writer } of this.valueDescriptors) {
              if (defaultValue != undefined && !this.controller.data.has(key)) {
                  this.invokeChangedCallback(name, writer(defaultValue), undefined);
              }
          }
      }
      invokeChangedCallback(name, rawValue, rawOldValue) {
          const changedMethodName = `${name}Changed`;
          const changedMethod = this.receiver[changedMethodName];
          if (typeof changedMethod == "function") {
              const descriptor = this.valueDescriptorNameMap[name];
              try {
                  const value = descriptor.reader(rawValue);
                  let oldValue = rawOldValue;
                  if (rawOldValue) {
                      oldValue = descriptor.reader(rawOldValue);
                  }
                  changedMethod.call(this.receiver, value, oldValue);
              }
              catch (error) {
                  if (error instanceof TypeError) {
                      error.message = `Stimulus Value "${this.context.identifier}.${descriptor.name}" - ${error.message}`;
                  }
                  throw error;
              }
          }
      }
      get valueDescriptors() {
          const { valueDescriptorMap } = this;
          return Object.keys(valueDescriptorMap).map((key) => valueDescriptorMap[key]);
      }
      get valueDescriptorNameMap() {
          const descriptors = {};
          Object.keys(this.valueDescriptorMap).forEach((key) => {
              const descriptor = this.valueDescriptorMap[key];
              descriptors[descriptor.name] = descriptor;
          });
          return descriptors;
      }
      hasValue(attributeName) {
          const descriptor = this.valueDescriptorNameMap[attributeName];
          const hasMethodName = `has${capitalize(descriptor.name)}`;
          return this.receiver[hasMethodName];
      }
  }

  class TargetObserver {
      constructor(context, delegate) {
          this.context = context;
          this.delegate = delegate;
          this.targetsByName = new Multimap();
      }
      start() {
          if (!this.tokenListObserver) {
              this.tokenListObserver = new TokenListObserver(this.element, this.attributeName, this);
              this.tokenListObserver.start();
          }
      }
      stop() {
          if (this.tokenListObserver) {
              this.disconnectAllTargets();
              this.tokenListObserver.stop();
              delete this.tokenListObserver;
          }
      }
      tokenMatched({ element, content: name }) {
          if (this.scope.containsElement(element)) {
              this.connectTarget(element, name);
          }
      }
      tokenUnmatched({ element, content: name }) {
          this.disconnectTarget(element, name);
      }
      connectTarget(element, name) {
          var _a;
          if (!this.targetsByName.has(name, element)) {
              this.targetsByName.add(name, element);
              (_a = this.tokenListObserver) === null || _a === void 0 ? void 0 : _a.pause(() => this.delegate.targetConnected(element, name));
          }
      }
      disconnectTarget(element, name) {
          var _a;
          if (this.targetsByName.has(name, element)) {
              this.targetsByName.delete(name, element);
              (_a = this.tokenListObserver) === null || _a === void 0 ? void 0 : _a.pause(() => this.delegate.targetDisconnected(element, name));
          }
      }
      disconnectAllTargets() {
          for (const name of this.targetsByName.keys) {
              for (const element of this.targetsByName.getValuesForKey(name)) {
                  this.disconnectTarget(element, name);
              }
          }
      }
      get attributeName() {
          return `data-${this.context.identifier}-target`;
      }
      get element() {
          return this.context.element;
      }
      get scope() {
          return this.context.scope;
      }
  }

  function readInheritableStaticArrayValues(constructor, propertyName) {
      const ancestors = getAncestorsForConstructor(constructor);
      return Array.from(ancestors.reduce((values, constructor) => {
          getOwnStaticArrayValues(constructor, propertyName).forEach((name) => values.add(name));
          return values;
      }, new Set()));
  }
  function getAncestorsForConstructor(constructor) {
      const ancestors = [];
      while (constructor) {
          ancestors.push(constructor);
          constructor = Object.getPrototypeOf(constructor);
      }
      return ancestors.reverse();
  }
  function getOwnStaticArrayValues(constructor, propertyName) {
      const definition = constructor[propertyName];
      return Array.isArray(definition) ? definition : [];
  }

  class OutletObserver {
      constructor(context, delegate) {
          this.started = false;
          this.context = context;
          this.delegate = delegate;
          this.outletsByName = new Multimap();
          this.outletElementsByName = new Multimap();
          this.selectorObserverMap = new Map();
          this.attributeObserverMap = new Map();
      }
      start() {
          if (!this.started) {
              this.outletDefinitions.forEach((outletName) => {
                  this.setupSelectorObserverForOutlet(outletName);
                  this.setupAttributeObserverForOutlet(outletName);
              });
              this.started = true;
              this.dependentContexts.forEach((context) => context.refresh());
          }
      }
      refresh() {
          this.selectorObserverMap.forEach((observer) => observer.refresh());
          this.attributeObserverMap.forEach((observer) => observer.refresh());
      }
      stop() {
          if (this.started) {
              this.started = false;
              this.disconnectAllOutlets();
              this.stopSelectorObservers();
              this.stopAttributeObservers();
          }
      }
      stopSelectorObservers() {
          if (this.selectorObserverMap.size > 0) {
              this.selectorObserverMap.forEach((observer) => observer.stop());
              this.selectorObserverMap.clear();
          }
      }
      stopAttributeObservers() {
          if (this.attributeObserverMap.size > 0) {
              this.attributeObserverMap.forEach((observer) => observer.stop());
              this.attributeObserverMap.clear();
          }
      }
      selectorMatched(element, _selector, { outletName }) {
          const outlet = this.getOutlet(element, outletName);
          if (outlet) {
              this.connectOutlet(outlet, element, outletName);
          }
      }
      selectorUnmatched(element, _selector, { outletName }) {
          const outlet = this.getOutletFromMap(element, outletName);
          if (outlet) {
              this.disconnectOutlet(outlet, element, outletName);
          }
      }
      selectorMatchElement(element, { outletName }) {
          const selector = this.selector(outletName);
          const hasOutlet = this.hasOutlet(element, outletName);
          const hasOutletController = element.matches(`[${this.schema.controllerAttribute}~=${outletName}]`);
          if (selector) {
              return hasOutlet && hasOutletController && element.matches(selector);
          }
          else {
              return false;
          }
      }
      elementMatchedAttribute(_element, attributeName) {
          const outletName = this.getOutletNameFromOutletAttributeName(attributeName);
          if (outletName) {
              this.updateSelectorObserverForOutlet(outletName);
          }
      }
      elementAttributeValueChanged(_element, attributeName) {
          const outletName = this.getOutletNameFromOutletAttributeName(attributeName);
          if (outletName) {
              this.updateSelectorObserverForOutlet(outletName);
          }
      }
      elementUnmatchedAttribute(_element, attributeName) {
          const outletName = this.getOutletNameFromOutletAttributeName(attributeName);
          if (outletName) {
              this.updateSelectorObserverForOutlet(outletName);
          }
      }
      connectOutlet(outlet, element, outletName) {
          var _a;
          if (!this.outletElementsByName.has(outletName, element)) {
              this.outletsByName.add(outletName, outlet);
              this.outletElementsByName.add(outletName, element);
              (_a = this.selectorObserverMap.get(outletName)) === null || _a === void 0 ? void 0 : _a.pause(() => this.delegate.outletConnected(outlet, element, outletName));
          }
      }
      disconnectOutlet(outlet, element, outletName) {
          var _a;
          if (this.outletElementsByName.has(outletName, element)) {
              this.outletsByName.delete(outletName, outlet);
              this.outletElementsByName.delete(outletName, element);
              (_a = this.selectorObserverMap
                  .get(outletName)) === null || _a === void 0 ? void 0 : _a.pause(() => this.delegate.outletDisconnected(outlet, element, outletName));
          }
      }
      disconnectAllOutlets() {
          for (const outletName of this.outletElementsByName.keys) {
              for (const element of this.outletElementsByName.getValuesForKey(outletName)) {
                  for (const outlet of this.outletsByName.getValuesForKey(outletName)) {
                      this.disconnectOutlet(outlet, element, outletName);
                  }
              }
          }
      }
      updateSelectorObserverForOutlet(outletName) {
          const observer = this.selectorObserverMap.get(outletName);
          if (observer) {
              observer.selector = this.selector(outletName);
          }
      }
      setupSelectorObserverForOutlet(outletName) {
          const selector = this.selector(outletName);
          const selectorObserver = new SelectorObserver(document.body, selector, this, { outletName });
          this.selectorObserverMap.set(outletName, selectorObserver);
          selectorObserver.start();
      }
      setupAttributeObserverForOutlet(outletName) {
          const attributeName = this.attributeNameForOutletName(outletName);
          const attributeObserver = new AttributeObserver(this.scope.element, attributeName, this);
          this.attributeObserverMap.set(outletName, attributeObserver);
          attributeObserver.start();
      }
      selector(outletName) {
          return this.scope.outlets.getSelectorForOutletName(outletName);
      }
      attributeNameForOutletName(outletName) {
          return this.scope.schema.outletAttributeForScope(this.identifier, outletName);
      }
      getOutletNameFromOutletAttributeName(attributeName) {
          return this.outletDefinitions.find((outletName) => this.attributeNameForOutletName(outletName) === attributeName);
      }
      get outletDependencies() {
          const dependencies = new Multimap();
          this.router.modules.forEach((module) => {
              const constructor = module.definition.controllerConstructor;
              const outlets = readInheritableStaticArrayValues(constructor, "outlets");
              outlets.forEach((outlet) => dependencies.add(outlet, module.identifier));
          });
          return dependencies;
      }
      get outletDefinitions() {
          return this.outletDependencies.getKeysForValue(this.identifier);
      }
      get dependentControllerIdentifiers() {
          return this.outletDependencies.getValuesForKey(this.identifier);
      }
      get dependentContexts() {
          const identifiers = this.dependentControllerIdentifiers;
          return this.router.contexts.filter((context) => identifiers.includes(context.identifier));
      }
      hasOutlet(element, outletName) {
          return !!this.getOutlet(element, outletName) || !!this.getOutletFromMap(element, outletName);
      }
      getOutlet(element, outletName) {
          return this.application.getControllerForElementAndIdentifier(element, outletName);
      }
      getOutletFromMap(element, outletName) {
          return this.outletsByName.getValuesForKey(outletName).find((outlet) => outlet.element === element);
      }
      get scope() {
          return this.context.scope;
      }
      get schema() {
          return this.context.schema;
      }
      get identifier() {
          return this.context.identifier;
      }
      get application() {
          return this.context.application;
      }
      get router() {
          return this.application.router;
      }
  }

  class Context {
      constructor(module, scope) {
          this.logDebugActivity = (functionName, detail = {}) => {
              const { identifier, controller, element } = this;
              detail = Object.assign({ identifier, controller, element }, detail);
              this.application.logDebugActivity(this.identifier, functionName, detail);
          };
          this.module = module;
          this.scope = scope;
          this.controller = new module.controllerConstructor(this);
          this.bindingObserver = new BindingObserver(this, this.dispatcher);
          this.valueObserver = new ValueObserver(this, this.controller);
          this.targetObserver = new TargetObserver(this, this);
          this.outletObserver = new OutletObserver(this, this);
          try {
              this.controller.initialize();
              this.logDebugActivity("initialize");
          }
          catch (error) {
              this.handleError(error, "initializing controller");
          }
      }
      connect() {
          this.bindingObserver.start();
          this.valueObserver.start();
          this.targetObserver.start();
          this.outletObserver.start();
          try {
              this.controller.connect();
              this.logDebugActivity("connect");
          }
          catch (error) {
              this.handleError(error, "connecting controller");
          }
      }
      refresh() {
          this.outletObserver.refresh();
      }
      disconnect() {
          try {
              this.controller.disconnect();
              this.logDebugActivity("disconnect");
          }
          catch (error) {
              this.handleError(error, "disconnecting controller");
          }
          this.outletObserver.stop();
          this.targetObserver.stop();
          this.valueObserver.stop();
          this.bindingObserver.stop();
      }
      get application() {
          return this.module.application;
      }
      get identifier() {
          return this.module.identifier;
      }
      get schema() {
          return this.application.schema;
      }
      get dispatcher() {
          return this.application.dispatcher;
      }
      get element() {
          return this.scope.element;
      }
      get parentElement() {
          return this.element.parentElement;
      }
      handleError(error, message, detail = {}) {
          const { identifier, controller, element } = this;
          detail = Object.assign({ identifier, controller, element }, detail);
          this.application.handleError(error, `Error ${message}`, detail);
      }
      targetConnected(element, name) {
          this.invokeControllerMethod(`${name}TargetConnected`, element);
      }
      targetDisconnected(element, name) {
          this.invokeControllerMethod(`${name}TargetDisconnected`, element);
      }
      outletConnected(outlet, element, name) {
          this.invokeControllerMethod(`${namespaceCamelize(name)}OutletConnected`, outlet, element);
      }
      outletDisconnected(outlet, element, name) {
          this.invokeControllerMethod(`${namespaceCamelize(name)}OutletDisconnected`, outlet, element);
      }
      invokeControllerMethod(methodName, ...args) {
          const controller = this.controller;
          if (typeof controller[methodName] == "function") {
              controller[methodName](...args);
          }
      }
  }

  function bless(constructor) {
      return shadow(constructor, getBlessedProperties(constructor));
  }
  function shadow(constructor, properties) {
      const shadowConstructor = extend$1(constructor);
      const shadowProperties = getShadowProperties(constructor.prototype, properties);
      Object.defineProperties(shadowConstructor.prototype, shadowProperties);
      return shadowConstructor;
  }
  function getBlessedProperties(constructor) {
      const blessings = readInheritableStaticArrayValues(constructor, "blessings");
      return blessings.reduce((blessedProperties, blessing) => {
          const properties = blessing(constructor);
          for (const key in properties) {
              const descriptor = blessedProperties[key] || {};
              blessedProperties[key] = Object.assign(descriptor, properties[key]);
          }
          return blessedProperties;
      }, {});
  }
  function getShadowProperties(prototype, properties) {
      return getOwnKeys(properties).reduce((shadowProperties, key) => {
          const descriptor = getShadowedDescriptor(prototype, properties, key);
          if (descriptor) {
              Object.assign(shadowProperties, { [key]: descriptor });
          }
          return shadowProperties;
      }, {});
  }
  function getShadowedDescriptor(prototype, properties, key) {
      const shadowingDescriptor = Object.getOwnPropertyDescriptor(prototype, key);
      const shadowedByValue = shadowingDescriptor && "value" in shadowingDescriptor;
      if (!shadowedByValue) {
          const descriptor = Object.getOwnPropertyDescriptor(properties, key).value;
          if (shadowingDescriptor) {
              descriptor.get = shadowingDescriptor.get || descriptor.get;
              descriptor.set = shadowingDescriptor.set || descriptor.set;
          }
          return descriptor;
      }
  }
  const getOwnKeys = (() => {
      if (typeof Object.getOwnPropertySymbols == "function") {
          return (object) => [...Object.getOwnPropertyNames(object), ...Object.getOwnPropertySymbols(object)];
      }
      else {
          return Object.getOwnPropertyNames;
      }
  })();
  const extend$1 = (() => {
      function extendWithReflect(constructor) {
          function extended() {
              return Reflect.construct(constructor, arguments, new.target);
          }
          extended.prototype = Object.create(constructor.prototype, {
              constructor: { value: extended },
          });
          Reflect.setPrototypeOf(extended, constructor);
          return extended;
      }
      function testReflectExtension() {
          const a = function () {
              this.a.call(this);
          };
          const b = extendWithReflect(a);
          b.prototype.a = function () { };
          return new b();
      }
      try {
          testReflectExtension();
          return extendWithReflect;
      }
      catch (error) {
          return (constructor) => class extended extends constructor {
          };
      }
  })();

  function blessDefinition(definition) {
      return {
          identifier: definition.identifier,
          controllerConstructor: bless(definition.controllerConstructor),
      };
  }

  class Module {
      constructor(application, definition) {
          this.application = application;
          this.definition = blessDefinition(definition);
          this.contextsByScope = new WeakMap();
          this.connectedContexts = new Set();
      }
      get identifier() {
          return this.definition.identifier;
      }
      get controllerConstructor() {
          return this.definition.controllerConstructor;
      }
      get contexts() {
          return Array.from(this.connectedContexts);
      }
      connectContextForScope(scope) {
          const context = this.fetchContextForScope(scope);
          this.connectedContexts.add(context);
          context.connect();
      }
      disconnectContextForScope(scope) {
          const context = this.contextsByScope.get(scope);
          if (context) {
              this.connectedContexts.delete(context);
              context.disconnect();
          }
      }
      fetchContextForScope(scope) {
          let context = this.contextsByScope.get(scope);
          if (!context) {
              context = new Context(this, scope);
              this.contextsByScope.set(scope, context);
          }
          return context;
      }
  }

  class ClassMap {
      constructor(scope) {
          this.scope = scope;
      }
      has(name) {
          return this.data.has(this.getDataKey(name));
      }
      get(name) {
          return this.getAll(name)[0];
      }
      getAll(name) {
          const tokenString = this.data.get(this.getDataKey(name)) || "";
          return tokenize(tokenString);
      }
      getAttributeName(name) {
          return this.data.getAttributeNameForKey(this.getDataKey(name));
      }
      getDataKey(name) {
          return `${name}-class`;
      }
      get data() {
          return this.scope.data;
      }
  }

  class DataMap {
      constructor(scope) {
          this.scope = scope;
      }
      get element() {
          return this.scope.element;
      }
      get identifier() {
          return this.scope.identifier;
      }
      get(key) {
          const name = this.getAttributeNameForKey(key);
          return this.element.getAttribute(name);
      }
      set(key, value) {
          const name = this.getAttributeNameForKey(key);
          this.element.setAttribute(name, value);
          return this.get(key);
      }
      has(key) {
          const name = this.getAttributeNameForKey(key);
          return this.element.hasAttribute(name);
      }
      delete(key) {
          if (this.has(key)) {
              const name = this.getAttributeNameForKey(key);
              this.element.removeAttribute(name);
              return true;
          }
          else {
              return false;
          }
      }
      getAttributeNameForKey(key) {
          return `data-${this.identifier}-${dasherize(key)}`;
      }
  }

  class Guide {
      constructor(logger) {
          this.warnedKeysByObject = new WeakMap();
          this.logger = logger;
      }
      warn(object, key, message) {
          let warnedKeys = this.warnedKeysByObject.get(object);
          if (!warnedKeys) {
              warnedKeys = new Set();
              this.warnedKeysByObject.set(object, warnedKeys);
          }
          if (!warnedKeys.has(key)) {
              warnedKeys.add(key);
              this.logger.warn(message, object);
          }
      }
  }

  function attributeValueContainsToken(attributeName, token) {
      return `[${attributeName}~="${token}"]`;
  }

  class TargetSet {
      constructor(scope) {
          this.scope = scope;
      }
      get element() {
          return this.scope.element;
      }
      get identifier() {
          return this.scope.identifier;
      }
      get schema() {
          return this.scope.schema;
      }
      has(targetName) {
          return this.find(targetName) != null;
      }
      find(...targetNames) {
          return targetNames.reduce((target, targetName) => target || this.findTarget(targetName) || this.findLegacyTarget(targetName), undefined);
      }
      findAll(...targetNames) {
          return targetNames.reduce((targets, targetName) => [
              ...targets,
              ...this.findAllTargets(targetName),
              ...this.findAllLegacyTargets(targetName),
          ], []);
      }
      findTarget(targetName) {
          const selector = this.getSelectorForTargetName(targetName);
          return this.scope.findElement(selector);
      }
      findAllTargets(targetName) {
          const selector = this.getSelectorForTargetName(targetName);
          return this.scope.findAllElements(selector);
      }
      getSelectorForTargetName(targetName) {
          const attributeName = this.schema.targetAttributeForScope(this.identifier);
          return attributeValueContainsToken(attributeName, targetName);
      }
      findLegacyTarget(targetName) {
          const selector = this.getLegacySelectorForTargetName(targetName);
          return this.deprecate(this.scope.findElement(selector), targetName);
      }
      findAllLegacyTargets(targetName) {
          const selector = this.getLegacySelectorForTargetName(targetName);
          return this.scope.findAllElements(selector).map((element) => this.deprecate(element, targetName));
      }
      getLegacySelectorForTargetName(targetName) {
          const targetDescriptor = `${this.identifier}.${targetName}`;
          return attributeValueContainsToken(this.schema.targetAttribute, targetDescriptor);
      }
      deprecate(element, targetName) {
          if (element) {
              const { identifier } = this;
              const attributeName = this.schema.targetAttribute;
              const revisedAttributeName = this.schema.targetAttributeForScope(identifier);
              this.guide.warn(element, `target:${targetName}`, `Please replace ${attributeName}="${identifier}.${targetName}" with ${revisedAttributeName}="${targetName}". ` +
                  `The ${attributeName} attribute is deprecated and will be removed in a future version of Stimulus.`);
          }
          return element;
      }
      get guide() {
          return this.scope.guide;
      }
  }

  class OutletSet {
      constructor(scope, controllerElement) {
          this.scope = scope;
          this.controllerElement = controllerElement;
      }
      get element() {
          return this.scope.element;
      }
      get identifier() {
          return this.scope.identifier;
      }
      get schema() {
          return this.scope.schema;
      }
      has(outletName) {
          return this.find(outletName) != null;
      }
      find(...outletNames) {
          return outletNames.reduce((outlet, outletName) => outlet || this.findOutlet(outletName), undefined);
      }
      findAll(...outletNames) {
          return outletNames.reduce((outlets, outletName) => [...outlets, ...this.findAllOutlets(outletName)], []);
      }
      getSelectorForOutletName(outletName) {
          const attributeName = this.schema.outletAttributeForScope(this.identifier, outletName);
          return this.controllerElement.getAttribute(attributeName);
      }
      findOutlet(outletName) {
          const selector = this.getSelectorForOutletName(outletName);
          if (selector)
              return this.findElement(selector, outletName);
      }
      findAllOutlets(outletName) {
          const selector = this.getSelectorForOutletName(outletName);
          return selector ? this.findAllElements(selector, outletName) : [];
      }
      findElement(selector, outletName) {
          const elements = this.scope.queryElements(selector);
          return elements.filter((element) => this.matchesElement(element, selector, outletName))[0];
      }
      findAllElements(selector, outletName) {
          const elements = this.scope.queryElements(selector);
          return elements.filter((element) => this.matchesElement(element, selector, outletName));
      }
      matchesElement(element, selector, outletName) {
          const controllerAttribute = element.getAttribute(this.scope.schema.controllerAttribute) || "";
          return element.matches(selector) && controllerAttribute.split(" ").includes(outletName);
      }
  }

  class Scope {
      constructor(schema, element, identifier, logger) {
          this.targets = new TargetSet(this);
          this.classes = new ClassMap(this);
          this.data = new DataMap(this);
          this.containsElement = (element) => {
              return element.closest(this.controllerSelector) === this.element;
          };
          this.schema = schema;
          this.element = element;
          this.identifier = identifier;
          this.guide = new Guide(logger);
          this.outlets = new OutletSet(this.documentScope, element);
      }
      findElement(selector) {
          return this.element.matches(selector) ? this.element : this.queryElements(selector).find(this.containsElement);
      }
      findAllElements(selector) {
          return [
              ...(this.element.matches(selector) ? [this.element] : []),
              ...this.queryElements(selector).filter(this.containsElement),
          ];
      }
      queryElements(selector) {
          return Array.from(this.element.querySelectorAll(selector));
      }
      get controllerSelector() {
          return attributeValueContainsToken(this.schema.controllerAttribute, this.identifier);
      }
      get isDocumentScope() {
          return this.element === document.documentElement;
      }
      get documentScope() {
          return this.isDocumentScope
              ? this
              : new Scope(this.schema, document.documentElement, this.identifier, this.guide.logger);
      }
  }

  class ScopeObserver {
      constructor(element, schema, delegate) {
          this.element = element;
          this.schema = schema;
          this.delegate = delegate;
          this.valueListObserver = new ValueListObserver(this.element, this.controllerAttribute, this);
          this.scopesByIdentifierByElement = new WeakMap();
          this.scopeReferenceCounts = new WeakMap();
      }
      start() {
          this.valueListObserver.start();
      }
      stop() {
          this.valueListObserver.stop();
      }
      get controllerAttribute() {
          return this.schema.controllerAttribute;
      }
      parseValueForToken(token) {
          const { element, content: identifier } = token;
          return this.parseValueForElementAndIdentifier(element, identifier);
      }
      parseValueForElementAndIdentifier(element, identifier) {
          const scopesByIdentifier = this.fetchScopesByIdentifierForElement(element);
          let scope = scopesByIdentifier.get(identifier);
          if (!scope) {
              scope = this.delegate.createScopeForElementAndIdentifier(element, identifier);
              scopesByIdentifier.set(identifier, scope);
          }
          return scope;
      }
      elementMatchedValue(element, value) {
          const referenceCount = (this.scopeReferenceCounts.get(value) || 0) + 1;
          this.scopeReferenceCounts.set(value, referenceCount);
          if (referenceCount == 1) {
              this.delegate.scopeConnected(value);
          }
      }
      elementUnmatchedValue(element, value) {
          const referenceCount = this.scopeReferenceCounts.get(value);
          if (referenceCount) {
              this.scopeReferenceCounts.set(value, referenceCount - 1);
              if (referenceCount == 1) {
                  this.delegate.scopeDisconnected(value);
              }
          }
      }
      fetchScopesByIdentifierForElement(element) {
          let scopesByIdentifier = this.scopesByIdentifierByElement.get(element);
          if (!scopesByIdentifier) {
              scopesByIdentifier = new Map();
              this.scopesByIdentifierByElement.set(element, scopesByIdentifier);
          }
          return scopesByIdentifier;
      }
  }

  class Router {
      constructor(application) {
          this.application = application;
          this.scopeObserver = new ScopeObserver(this.element, this.schema, this);
          this.scopesByIdentifier = new Multimap();
          this.modulesByIdentifier = new Map();
      }
      get element() {
          return this.application.element;
      }
      get schema() {
          return this.application.schema;
      }
      get logger() {
          return this.application.logger;
      }
      get controllerAttribute() {
          return this.schema.controllerAttribute;
      }
      get modules() {
          return Array.from(this.modulesByIdentifier.values());
      }
      get contexts() {
          return this.modules.reduce((contexts, module) => contexts.concat(module.contexts), []);
      }
      start() {
          this.scopeObserver.start();
      }
      stop() {
          this.scopeObserver.stop();
      }
      loadDefinition(definition) {
          this.unloadIdentifier(definition.identifier);
          const module = new Module(this.application, definition);
          this.connectModule(module);
          const afterLoad = definition.controllerConstructor.afterLoad;
          if (afterLoad) {
              afterLoad.call(definition.controllerConstructor, definition.identifier, this.application);
          }
      }
      unloadIdentifier(identifier) {
          const module = this.modulesByIdentifier.get(identifier);
          if (module) {
              this.disconnectModule(module);
          }
      }
      getContextForElementAndIdentifier(element, identifier) {
          const module = this.modulesByIdentifier.get(identifier);
          if (module) {
              return module.contexts.find((context) => context.element == element);
          }
      }
      proposeToConnectScopeForElementAndIdentifier(element, identifier) {
          const scope = this.scopeObserver.parseValueForElementAndIdentifier(element, identifier);
          if (scope) {
              this.scopeObserver.elementMatchedValue(scope.element, scope);
          }
          else {
              console.error(`Couldn't find or create scope for identifier: "${identifier}" and element:`, element);
          }
      }
      handleError(error, message, detail) {
          this.application.handleError(error, message, detail);
      }
      createScopeForElementAndIdentifier(element, identifier) {
          return new Scope(this.schema, element, identifier, this.logger);
      }
      scopeConnected(scope) {
          this.scopesByIdentifier.add(scope.identifier, scope);
          const module = this.modulesByIdentifier.get(scope.identifier);
          if (module) {
              module.connectContextForScope(scope);
          }
      }
      scopeDisconnected(scope) {
          this.scopesByIdentifier.delete(scope.identifier, scope);
          const module = this.modulesByIdentifier.get(scope.identifier);
          if (module) {
              module.disconnectContextForScope(scope);
          }
      }
      connectModule(module) {
          this.modulesByIdentifier.set(module.identifier, module);
          const scopes = this.scopesByIdentifier.getValuesForKey(module.identifier);
          scopes.forEach((scope) => module.connectContextForScope(scope));
      }
      disconnectModule(module) {
          this.modulesByIdentifier.delete(module.identifier);
          const scopes = this.scopesByIdentifier.getValuesForKey(module.identifier);
          scopes.forEach((scope) => module.disconnectContextForScope(scope));
      }
  }

  const defaultSchema = {
      controllerAttribute: "data-controller",
      actionAttribute: "data-action",
      targetAttribute: "data-target",
      targetAttributeForScope: (identifier) => `data-${identifier}-target`,
      outletAttributeForScope: (identifier, outlet) => `data-${identifier}-${outlet}-outlet`,
      keyMappings: Object.assign(Object.assign({ enter: "Enter", tab: "Tab", esc: "Escape", space: " ", up: "ArrowUp", down: "ArrowDown", left: "ArrowLeft", right: "ArrowRight", home: "Home", end: "End", page_up: "PageUp", page_down: "PageDown" }, objectFromEntries("abcdefghijklmnopqrstuvwxyz".split("").map((c) => [c, c]))), objectFromEntries("0123456789".split("").map((n) => [n, n]))),
  };
  function objectFromEntries(array) {
      return array.reduce((memo, [k, v]) => (Object.assign(Object.assign({}, memo), { [k]: v })), {});
  }

  class Application {
      constructor(element = document.documentElement, schema = defaultSchema) {
          this.logger = console;
          this.debug = false;
          this.logDebugActivity = (identifier, functionName, detail = {}) => {
              if (this.debug) {
                  this.logFormattedMessage(identifier, functionName, detail);
              }
          };
          this.element = element;
          this.schema = schema;
          this.dispatcher = new Dispatcher(this);
          this.router = new Router(this);
          this.actionDescriptorFilters = Object.assign({}, defaultActionDescriptorFilters);
      }
      static start(element, schema) {
          const application = new this(element, schema);
          application.start();
          return application;
      }
      async start() {
          await domReady();
          this.logDebugActivity("application", "starting");
          this.dispatcher.start();
          this.router.start();
          this.logDebugActivity("application", "start");
      }
      stop() {
          this.logDebugActivity("application", "stopping");
          this.dispatcher.stop();
          this.router.stop();
          this.logDebugActivity("application", "stop");
      }
      register(identifier, controllerConstructor) {
          this.load({ identifier, controllerConstructor });
      }
      registerActionOption(name, filter) {
          this.actionDescriptorFilters[name] = filter;
      }
      load(head, ...rest) {
          const definitions = Array.isArray(head) ? head : [head, ...rest];
          definitions.forEach((definition) => {
              if (definition.controllerConstructor.shouldLoad) {
                  this.router.loadDefinition(definition);
              }
          });
      }
      unload(head, ...rest) {
          const identifiers = Array.isArray(head) ? head : [head, ...rest];
          identifiers.forEach((identifier) => this.router.unloadIdentifier(identifier));
      }
      get controllers() {
          return this.router.contexts.map((context) => context.controller);
      }
      getControllerForElementAndIdentifier(element, identifier) {
          const context = this.router.getContextForElementAndIdentifier(element, identifier);
          return context ? context.controller : null;
      }
      handleError(error, message, detail) {
          var _a;
          this.logger.error(`%s\n\n%o\n\n%o`, message, error, detail);
          (_a = window.onerror) === null || _a === void 0 ? void 0 : _a.call(window, message, "", 0, 0, error);
      }
      logFormattedMessage(identifier, functionName, detail = {}) {
          detail = Object.assign({ application: this }, detail);
          this.logger.groupCollapsed(`${identifier} #${functionName}`);
          this.logger.log("details:", Object.assign({}, detail));
          this.logger.groupEnd();
      }
  }
  function domReady() {
      return new Promise((resolve) => {
          if (document.readyState == "loading") {
              document.addEventListener("DOMContentLoaded", () => resolve());
          }
          else {
              resolve();
          }
      });
  }

  class StimulusReloader {
    static async reload() {
      for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
        params[_key] = arguments[_key];
      }
      return new StimulusReloader(...params).reload();
    }
    constructor() {
      let document = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.document;
      let filePattern = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : /./;
      this.document = document;
      this.filePattern = filePattern;
      this.application = window.Stimulus || Application.start();
    }
    async reload() {
      log("Reload Stimulus controllers...");
      this.application.stop();
      await this.#reloadStimulusControllers();
      this.application.start();
    }
    async #reloadStimulusControllers() {
      await Promise.all(this.#stimulusControllerPaths.map(async moduleName => this.#reloadStimulusController(moduleName)));
    }
    get #stimulusControllerPaths() {
      return Object.keys(this.#stimulusPathsByModule).filter(path => path.endsWith("_controller") && this.filePattern.test(path));
    }
    get #stimulusPathsByModule() {
      this.pathsByModule = this.pathsByModule || this.#parseImportmapJson();
      return this.pathsByModule;
    }
    #parseImportmapJson() {
      const importmapScript = this.document.querySelector("script[type=importmap]");
      return JSON.parse(importmapScript.text).imports;
    }
    async #reloadStimulusController(moduleName) {
      log(`\t${moduleName}`);
      const controllerName = this.#extractControllerName(moduleName);
      const path = cacheBustedUrl(this.#pathForModuleName(moduleName));
      const module = await import(path);
      this.#registerController(controllerName, module);
    }
    #pathForModuleName(moduleName) {
      return this.#stimulusPathsByModule[moduleName];
    }
    #extractControllerName(path) {
      return path.replace(/^.*\//, "").replace("_controller", "").replace(/\//g, "--").replace(/_/g, "-");
    }
    #registerController(name, module) {
      this.application.unload(name);
      this.application.register(name, module.default);
    }
  }

  class HtmlReloader {
    static async reload() {
      return new HtmlReloader().reload();
    }
    async reload() {
      const reloadedDocument = await this.#reloadHtml();
      await this.#reloadStimulus(reloadedDocument);
    }
    async #reloadHtml() {
      try {
        log("Reload html...");
        const reloadedDocument = await reloadHtmlDocument();
        this.#updateBody(reloadedDocument.body);
        return reloadedDocument;
      } catch (error) {
        console.error("Error reloading HTML:", error);
      }
    }
    async #reloadStimulus(reloadedDocument) {
      return new StimulusReloader(reloadedDocument).reload();
    }
    #updateBody(newBody) {
      Idiomorph.morph(document.body, newBody, {
        callbacks: {
          beforeNodeMorphed: function (oldNode, newNode) {
            const value = !(oldNode instanceof HTMLElement) || !oldNode.closest("turbo-cable-stream-source");
            return value;
          }
        }
      });
    }
  }

  StreamActions.reload_html = function () {
    HtmlReloader.reload();
  };

  StreamActions.reload_stimulus = function () {
    const filePath = nameFromFilePath(this.getAttribute("file_path"));
    StimulusReloader.reload(window.document, new RegExp(filePath));
  };

  const HotwireSpark = {
    config: {
      loggingEnabled: true
    }
  };

  var adapters = {
    logger: typeof console !== "undefined" ? console : undefined,
    WebSocket: typeof WebSocket !== "undefined" ? WebSocket : undefined,
  };

  // The logger is disabled by default. You can enable it with:
  //
  //   ActionCable.logger.enabled = true
  //
  //   Example:
  //
  //   import * as ActionCable from '@rails/actioncable'
  //
  //   ActionCable.logger.enabled = true
  //   ActionCable.logger.log('Connection Established.')
  //

  var logger = {
    log(...messages) {
      if (this.enabled) {
        messages.push(Date.now());
        adapters.logger.log("[ActionCable]", ...messages);
      }
    },
  };

  // Responsible for ensuring the cable connection is in good health by validating the heartbeat pings sent from the server, and attempting
  // revival reconnections if things go astray. Internal class, not intended for direct user manipulation.

  const now = () => new Date().getTime();

  const secondsSince = time => (now() - time) / 1000;

  class ConnectionMonitor {
    constructor(connection) {
      this.visibilityDidChange = this.visibilityDidChange.bind(this);
      this.connection = connection;
      this.reconnectAttempts = 0;
    }

    start() {
      if (!this.isRunning()) {
        this.startedAt = now();
        delete this.stoppedAt;
        this.startPolling();
        addEventListener("visibilitychange", this.visibilityDidChange);
        logger.log(`ConnectionMonitor started. stale threshold = ${this.constructor.staleThreshold} s`);
      }
    }

    stop() {
      if (this.isRunning()) {
        this.stoppedAt = now();
        this.stopPolling();
        removeEventListener("visibilitychange", this.visibilityDidChange);
        logger.log("ConnectionMonitor stopped");
      }
    }

    isRunning() {
      return this.startedAt && !this.stoppedAt
    }

    recordMessage() {
      this.pingedAt = now();
    }

    recordConnect() {
      this.reconnectAttempts = 0;
      delete this.disconnectedAt;
      logger.log("ConnectionMonitor recorded connect");
    }

    recordDisconnect() {
      this.disconnectedAt = now();
      logger.log("ConnectionMonitor recorded disconnect");
    }

    // Private

    startPolling() {
      this.stopPolling();
      this.poll();
    }

    stopPolling() {
      clearTimeout(this.pollTimeout);
    }

    poll() {
      this.pollTimeout = setTimeout(() => {
        this.reconnectIfStale();
        this.poll();
      }
      , this.getPollInterval());
    }

    getPollInterval() {
      const { staleThreshold, reconnectionBackoffRate } = this.constructor;
      const backoff = Math.pow(1 + reconnectionBackoffRate, Math.min(this.reconnectAttempts, 10));
      const jitterMax = this.reconnectAttempts === 0 ? 1.0 : reconnectionBackoffRate;
      const jitter = jitterMax * Math.random();
      return staleThreshold * 1000 * backoff * (1 + jitter)
    }

    reconnectIfStale() {
      if (this.connectionIsStale()) {
        logger.log(`ConnectionMonitor detected stale connection. reconnectAttempts = ${this.reconnectAttempts}, time stale = ${secondsSince(this.refreshedAt)} s, stale threshold = ${this.constructor.staleThreshold} s`);
        this.reconnectAttempts++;
        if (this.disconnectedRecently()) {
          logger.log(`ConnectionMonitor skipping reopening recent disconnect. time disconnected = ${secondsSince(this.disconnectedAt)} s`);
        } else {
          logger.log("ConnectionMonitor reopening");
          this.connection.reopen();
        }
      }
    }

    get refreshedAt() {
      return this.pingedAt ? this.pingedAt : this.startedAt
    }

    connectionIsStale() {
      return secondsSince(this.refreshedAt) > this.constructor.staleThreshold
    }

    disconnectedRecently() {
      return this.disconnectedAt && (secondsSince(this.disconnectedAt) < this.constructor.staleThreshold)
    }

    visibilityDidChange() {
      if (document.visibilityState === "visible") {
        setTimeout(() => {
          if (this.connectionIsStale() || !this.connection.isOpen()) {
            logger.log(`ConnectionMonitor reopening stale connection on visibilitychange. visibilityState = ${document.visibilityState}`);
            this.connection.reopen();
          }
        }
        , 200);
      }
    }

  }

  ConnectionMonitor.staleThreshold = 6; // Server::Connections::BEAT_INTERVAL * 2 (missed two pings)
  ConnectionMonitor.reconnectionBackoffRate = 0.15;

  var INTERNAL = {
    "message_types": {
      "welcome": "welcome",
      "disconnect": "disconnect",
      "ping": "ping",
      "confirmation": "confirm_subscription",
      "rejection": "reject_subscription"
    },
    "disconnect_reasons": {
      "unauthorized": "unauthorized",
      "invalid_request": "invalid_request",
      "server_restart": "server_restart",
      "remote": "remote"
    },
    "default_mount_path": "/cable",
    "protocols": [
      "actioncable-v1-json",
      "actioncable-unsupported"
    ]
  };

  // Encapsulate the cable connection held by the consumer. This is an internal class not intended for direct user manipulation.

  const {message_types, protocols} = INTERNAL;
  const supportedProtocols = protocols.slice(0, protocols.length - 1);

  const indexOf = [].indexOf;

  class Connection {
    constructor(consumer) {
      this.open = this.open.bind(this);
      this.consumer = consumer;
      this.subscriptions = this.consumer.subscriptions;
      this.monitor = new ConnectionMonitor(this);
      this.disconnected = true;
    }

    send(data) {
      if (this.isOpen()) {
        this.webSocket.send(JSON.stringify(data));
        return true
      } else {
        return false
      }
    }

    open() {
      if (this.isActive()) {
        logger.log(`Attempted to open WebSocket, but existing socket is ${this.getState()}`);
        return false
      } else {
        const socketProtocols = [...protocols, ...this.consumer.subprotocols || []];
        logger.log(`Opening WebSocket, current state is ${this.getState()}, subprotocols: ${socketProtocols}`);
        if (this.webSocket) { this.uninstallEventHandlers(); }
        this.webSocket = new adapters.WebSocket(this.consumer.url, socketProtocols);
        this.installEventHandlers();
        this.monitor.start();
        return true
      }
    }

    close({allowReconnect} = {allowReconnect: true}) {
      if (!allowReconnect) { this.monitor.stop(); }
      // Avoid closing websockets in a "connecting" state due to Safari 15.1+ bug. See: https://github.com/rails/rails/issues/43835#issuecomment-1002288478
      if (this.isOpen()) {
        return this.webSocket.close()
      }
    }

    reopen() {
      logger.log(`Reopening WebSocket, current state is ${this.getState()}`);
      if (this.isActive()) {
        try {
          return this.close()
        } catch (error) {
          logger.log("Failed to reopen WebSocket", error);
        }
        finally {
          logger.log(`Reopening WebSocket in ${this.constructor.reopenDelay}ms`);
          setTimeout(this.open, this.constructor.reopenDelay);
        }
      } else {
        return this.open()
      }
    }

    getProtocol() {
      if (this.webSocket) {
        return this.webSocket.protocol
      }
    }

    isOpen() {
      return this.isState("open")
    }

    isActive() {
      return this.isState("open", "connecting")
    }

    triedToReconnect() {
      return this.monitor.reconnectAttempts > 0
    }

    // Private

    isProtocolSupported() {
      return indexOf.call(supportedProtocols, this.getProtocol()) >= 0
    }

    isState(...states) {
      return indexOf.call(states, this.getState()) >= 0
    }

    getState() {
      if (this.webSocket) {
        for (let state in adapters.WebSocket) {
          if (adapters.WebSocket[state] === this.webSocket.readyState) {
            return state.toLowerCase()
          }
        }
      }
      return null
    }

    installEventHandlers() {
      for (let eventName in this.events) {
        const handler = this.events[eventName].bind(this);
        this.webSocket[`on${eventName}`] = handler;
      }
    }

    uninstallEventHandlers() {
      for (let eventName in this.events) {
        this.webSocket[`on${eventName}`] = function() {};
      }
    }

  }

  Connection.reopenDelay = 500;

  Connection.prototype.events = {
    message(event) {
      if (!this.isProtocolSupported()) { return }
      const {identifier, message, reason, reconnect, type} = JSON.parse(event.data);
      this.monitor.recordMessage();
      switch (type) {
        case message_types.welcome:
          if (this.triedToReconnect()) {
            this.reconnectAttempted = true;
          }
          this.monitor.recordConnect();
          return this.subscriptions.reload()
        case message_types.disconnect:
          logger.log(`Disconnecting. Reason: ${reason}`);
          return this.close({allowReconnect: reconnect})
        case message_types.ping:
          return null
        case message_types.confirmation:
          this.subscriptions.confirmSubscription(identifier);
          if (this.reconnectAttempted) {
            this.reconnectAttempted = false;
            return this.subscriptions.notify(identifier, "connected", {reconnected: true})
          } else {
            return this.subscriptions.notify(identifier, "connected", {reconnected: false})
          }
        case message_types.rejection:
          return this.subscriptions.reject(identifier)
        default:
          return this.subscriptions.notify(identifier, "received", message)
      }
    },

    open() {
      logger.log(`WebSocket onopen event, using '${this.getProtocol()}' subprotocol`);
      this.disconnected = false;
      if (!this.isProtocolSupported()) {
        logger.log("Protocol is unsupported. Stopping monitor and disconnecting.");
        return this.close({allowReconnect: false})
      }
    },

    close(event) {
      logger.log("WebSocket onclose event");
      if (this.disconnected) { return }
      this.disconnected = true;
      this.monitor.recordDisconnect();
      return this.subscriptions.notifyAll("disconnected", {willAttemptReconnect: this.monitor.isRunning()})
    },

    error() {
      logger.log("WebSocket onerror event");
    }
  };

  // A new subscription is created through the ActionCable.Subscriptions instance available on the consumer.
  // It provides a number of callbacks and a method for calling remote procedure calls on the corresponding
  // Channel instance on the server side.
  //
  // An example demonstrates the basic functionality:
  //
  //   App.appearance = App.cable.subscriptions.create("AppearanceChannel", {
  //     connected() {
  //       // Called once the subscription has been successfully completed
  //     },
  //
  //     disconnected({ willAttemptReconnect: boolean }) {
  //       // Called when the client has disconnected with the server.
  //       // The object will have an `willAttemptReconnect` property which
  //       // says whether the client has the intention of attempting
  //       // to reconnect.
  //     },
  //
  //     appear() {
  //       this.perform('appear', {appearing_on: this.appearingOn()})
  //     },
  //
  //     away() {
  //       this.perform('away')
  //     },
  //
  //     appearingOn() {
  //       $('main').data('appearing-on')
  //     }
  //   })
  //
  // The methods #appear and #away forward their intent to the remote AppearanceChannel instance on the server
  // by calling the `perform` method with the first parameter being the action (which maps to AppearanceChannel#appear/away).
  // The second parameter is a hash that'll get JSON encoded and made available on the server in the data parameter.
  //
  // This is how the server component would look:
  //
  //   class AppearanceChannel < ApplicationActionCable::Channel
  //     def subscribed
  //       current_user.appear
  //     end
  //
  //     def unsubscribed
  //       current_user.disappear
  //     end
  //
  //     def appear(data)
  //       current_user.appear on: data['appearing_on']
  //     end
  //
  //     def away
  //       current_user.away
  //     end
  //   end
  //
  // The "AppearanceChannel" name is automatically mapped between the client-side subscription creation and the server-side Ruby class name.
  // The AppearanceChannel#appear/away public methods are exposed automatically to client-side invocation through the perform method.

  const extend = function(object, properties) {
    if (properties != null) {
      for (let key in properties) {
        const value = properties[key];
        object[key] = value;
      }
    }
    return object
  };

  class Subscription {
    constructor(consumer, params = {}, mixin) {
      this.consumer = consumer;
      this.identifier = JSON.stringify(params);
      extend(this, mixin);
    }

    // Perform a channel action with the optional data passed as an attribute
    perform(action, data = {}) {
      data.action = action;
      return this.send(data)
    }

    send(data) {
      return this.consumer.send({command: "message", identifier: this.identifier, data: JSON.stringify(data)})
    }

    unsubscribe() {
      return this.consumer.subscriptions.remove(this)
    }
  }

  // Responsible for ensuring channel subscribe command is confirmed, retrying until confirmation is received.
  // Internal class, not intended for direct user manipulation.

  class SubscriptionGuarantor {
    constructor(subscriptions) {
      this.subscriptions = subscriptions;
      this.pendingSubscriptions = [];
    }

    guarantee(subscription) {
      if(this.pendingSubscriptions.indexOf(subscription) == -1){ 
        logger.log(`SubscriptionGuarantor guaranteeing ${subscription.identifier}`);
        this.pendingSubscriptions.push(subscription); 
      }
      else {
        logger.log(`SubscriptionGuarantor already guaranteeing ${subscription.identifier}`);
      }
      this.startGuaranteeing();
    }

    forget(subscription) {
      logger.log(`SubscriptionGuarantor forgetting ${subscription.identifier}`);
      this.pendingSubscriptions = (this.pendingSubscriptions.filter((s) => s !== subscription));
    }

    startGuaranteeing() {
      this.stopGuaranteeing();
      this.retrySubscribing();
    }
    
    stopGuaranteeing() {
      clearTimeout(this.retryTimeout);
    }

    retrySubscribing() {
      this.retryTimeout = setTimeout(() => {
        if (this.subscriptions && typeof(this.subscriptions.subscribe) === "function") {
          this.pendingSubscriptions.map((subscription) => {
            logger.log(`SubscriptionGuarantor resubscribing ${subscription.identifier}`);
            this.subscriptions.subscribe(subscription);
          });
        }
      }
      , 500);
    }
  }

  // Collection class for creating (and internally managing) channel subscriptions.
  // The only method intended to be triggered by the user is ActionCable.Subscriptions#create,
  // and it should be called through the consumer like so:
  //
  //   App = {}
  //   App.cable = ActionCable.createConsumer("ws://example.com/accounts/1")
  //   App.appearance = App.cable.subscriptions.create("AppearanceChannel")
  //
  // For more details on how you'd configure an actual channel subscription, see ActionCable.Subscription.

  class Subscriptions {
    constructor(consumer) {
      this.consumer = consumer;
      this.guarantor = new SubscriptionGuarantor(this);
      this.subscriptions = [];
    }

    create(channelName, mixin) {
      const channel = channelName;
      const params = typeof channel === "object" ? channel : {channel};
      const subscription = new Subscription(this.consumer, params, mixin);
      return this.add(subscription)
    }

    // Private

    add(subscription) {
      this.subscriptions.push(subscription);
      this.consumer.ensureActiveConnection();
      this.notify(subscription, "initialized");
      this.subscribe(subscription);
      return subscription
    }

    remove(subscription) {
      this.forget(subscription);
      if (!this.findAll(subscription.identifier).length) {
        this.sendCommand(subscription, "unsubscribe");
      }
      return subscription
    }

    reject(identifier) {
      return this.findAll(identifier).map((subscription) => {
        this.forget(subscription);
        this.notify(subscription, "rejected");
        return subscription
      })
    }

    forget(subscription) {
      this.guarantor.forget(subscription);
      this.subscriptions = (this.subscriptions.filter((s) => s !== subscription));
      return subscription
    }

    findAll(identifier) {
      return this.subscriptions.filter((s) => s.identifier === identifier)
    }

    reload() {
      return this.subscriptions.map((subscription) =>
        this.subscribe(subscription))
    }

    notifyAll(callbackName, ...args) {
      return this.subscriptions.map((subscription) =>
        this.notify(subscription, callbackName, ...args))
    }

    notify(subscription, callbackName, ...args) {
      let subscriptions;
      if (typeof subscription === "string") {
        subscriptions = this.findAll(subscription);
      } else {
        subscriptions = [subscription];
      }

      return subscriptions.map((subscription) =>
        (typeof subscription[callbackName] === "function" ? subscription[callbackName](...args) : undefined))
    }

    subscribe(subscription) {
      if (this.sendCommand(subscription, "subscribe")) {
        this.guarantor.guarantee(subscription);
      }
    }

    confirmSubscription(identifier) {
      logger.log(`Subscription confirmed ${identifier}`);
      this.findAll(identifier).map((subscription) =>
        this.guarantor.forget(subscription));
    }

    sendCommand(subscription, command) {
      const {identifier} = subscription;
      return this.consumer.send({command, identifier})
    }
  }

  // The ActionCable.Consumer establishes the connection to a server-side Ruby Connection object. Once established,
  // the ActionCable.ConnectionMonitor will ensure that its properly maintained through heartbeats and checking for stale updates.
  // The Consumer instance is also the gateway to establishing subscriptions to desired channels through the #createSubscription
  // method.
  //
  // The following example shows how this can be set up:
  //
  //   App = {}
  //   App.cable = ActionCable.createConsumer("ws://example.com/accounts/1")
  //   App.appearance = App.cable.subscriptions.create("AppearanceChannel")
  //
  // For more details on how you'd configure an actual channel subscription, see ActionCable.Subscription.
  //
  // When a consumer is created, it automatically connects with the server.
  //
  // To disconnect from the server, call
  //
  //   App.cable.disconnect()
  //
  // and to restart the connection:
  //
  //   App.cable.connect()
  //
  // Any channel subscriptions which existed prior to disconnecting will
  // automatically resubscribe.

  class Consumer {
    constructor(url) {
      this._url = url;
      this.subscriptions = new Subscriptions(this);
      this.connection = new Connection(this);
      this.subprotocols = [];
    }

    get url() {
      return createWebSocketURL(this._url)
    }

    send(data) {
      return this.connection.send(data)
    }

    connect() {
      return this.connection.open()
    }

    disconnect() {
      return this.connection.close({allowReconnect: false})
    }

    ensureActiveConnection() {
      if (!this.connection.isActive()) {
        return this.connection.open()
      }
    }

    addSubProtocol(subprotocol) {
      this.subprotocols = [...this.subprotocols, subprotocol];
    }
  }

  function createWebSocketURL(url) {
    if (typeof url === "function") {
      url = url();
    }

    if (url && !/^wss?:/i.test(url)) {
      const a = document.createElement("a");
      a.href = url;
      // Fix populating Location properties in IE. Otherwise, protocol will be blank.
      a.href = a.href;
      a.protocol = a.protocol.replace("http", "ws");
      return a.href
    } else {
      return url
    }
  }

  function createConsumer(url = getConfig("url") || INTERNAL.default_mount_path) {
    return new Consumer(url)
  }

  function getConfig(name) {
    const element = document.head.querySelector(`meta[name='action-cable-${name}']`);
    if (element) {
      return element.getAttribute("content")
    }
  }

  var index = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Connection: Connection,
    ConnectionMonitor: ConnectionMonitor,
    Consumer: Consumer,
    INTERNAL: INTERNAL,
    Subscription: Subscription,
    SubscriptionGuarantor: SubscriptionGuarantor,
    Subscriptions: Subscriptions,
    adapters: adapters,
    createConsumer: createConsumer,
    createWebSocketURL: createWebSocketURL,
    getConfig: getConfig,
    logger: logger
  });

  return HotwireSpark;

})();

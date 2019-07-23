const AV = require("./aurora");
const MP3FrameHeader = require("./header");

class MP3Stream {
  constructor(stream) {
    this.stream = stream; // actual bitstream
    this.sync = false; // stream sync found
    this.freerate = 0; // free bitrate (fixed)
    this.this_frame = stream.stream.offset; // start of current frame
    this.next_frame = stream.stream.offset; // start of next frame

    this.main_data = new Uint8Array(MP3FrameHeader.BUFFER_MDLEN); // actual audio data
    this.md_len = 0; // length of main data

    // copy methods from actual stream
    for (const key in stream) {
      if (typeof stream[key] === "function") {
        this[key] = stream[key].bind(stream);
      }
    }
  }

  getU8(offset) {
    const stream = this.stream.stream;
    return stream.peekUInt8(offset - stream.offset);
  }

  nextByte() {
    const stream = this.stream;
    return stream.bitPosition === 0
      ? stream.stream.offset
      : stream.stream.offset + 1;
  }

  doSync() {
    const stream = this.stream.stream;
    this.align();

    while (
      this.available(16) &&
      !(stream.peekUInt8(0) === 0xff && (stream.peekUInt8(1) & 0xe0) === 0xe0)
    ) {
      this.advance(8);
    }

    if (!this.available(MP3FrameHeader.BUFFER_GUARD)) {
      return false;
    }

    return true;
  }

  reset(byteOffset) {
    this.seek(byteOffset * 8);
    this.next_frame = byteOffset;
    this.sync = true;
  }
}

module.exports = MP3Stream;

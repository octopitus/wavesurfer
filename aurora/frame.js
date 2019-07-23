const MP3FrameHeader = require("./header");
const utils = require("./utils");

class MP3Frame {
  constructor() {
    this.header = null; // MPEG audio header
    this.options = 0; // decoding options (from stream)
    this.sbsample = utils.makeArray([2, 36, 32]); // synthesis subband filter samples
    this.overlap = utils.makeArray([2, 32, 18]); // Layer III block overlap data
    this.decoders = [];
  }

  decode(stream) {
    if (
      !this.header ||
      !(this.header.flags & MP3FrameHeader.FLAGS.INCOMPLETE)
    ) {
      this.header = MP3FrameHeader.decode(stream);
    }

    this.header.flags &= ~MP3FrameHeader.FLAGS.INCOMPLETE;

    // make an instance of the decoder for this layer if needed
    let decoder = this.decoders[this.header.layer - 1];
    if (!decoder) {
      const Layer = MP3Frame.layers[this.header.layer];
      if (!Layer) {
        throw new Error("Layer " + this.header.layer + " is not supported.");
      }

      decoder = this.decoders[this.header.layer - 1] = new Layer();
    }

    decoder.decode(stream, this);
  }
}

// included layer decoders are registered here
MP3Frame.layers = [];

module.exports = MP3Frame;

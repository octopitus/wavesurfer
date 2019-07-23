const AV = require("./aurora");
const MP3FrameHeader = require("./header");
const MP3Stream = require("./stream");
const MP3Frame = require("./frame");
const MP3Synth = require("./synth");
const Layer1 = require("./layer1");
const Layer2 = require("./layer2");
const Layer3 = require("./layer3");

const MP3Decoder = AV.Decoder.extend(function() {
  AV.Decoder.register("mp3", this);

  this.prototype.init = function() {
    this.mp3_stream = new MP3Stream(this.bitstream);
    this.frame = new MP3Frame();
    this.synth = new MP3Synth();
    this.seeking = false;
  };

  this.prototype.readChunk = function() {
    const stream = this.mp3_stream;
    const frame = this.frame;
    const synth = this.synth;

    // if we just seeked, we may start getting errors involving the frame reservoir,
    // so keep going until we successfully decode a frame
    if (this.seeking) {
      while (true) {
        try {
          frame.decode(stream);
          break;
        } catch (err) {
          if (err instanceof AV.UnderflowError) {
            throw err;
          }
        }
      }

      this.seeking = false;
    } else {
      frame.decode(stream);
    }

    synth.frame(frame);

    // interleave samples
    const data = synth.pcm.samples;

    const channels = synth.pcm.channels;
    const len = synth.pcm.length;
    const output = new Float32Array(len * channels);
    let j = 0;

    for (let k = 0; k < len; k++) {
      for (let i = 0; i < channels; i++) {
        output[j++] = data[i][k];
      }
    }

    return output;
  };

  this.prototype.seek = function(timestamp) {
    let offset;

    // if there was a Xing or VBRI tag with a seek table, use that
    // otherwise guesstimate based on CBR bitrate
    if (this.demuxer.seekPoints.length > 0) {
      timestamp = this._super(timestamp);
      offset = this.stream.offset;
    } else {
      offset = (timestamp * this.format.bitrate) / 8 / this.format.sampleRate;
    }

    this.mp3_stream.reset(offset);

    // try to find 3 consecutive valid frame headers in a row
    for (var i = 0; i < 4096; i++) {
      let pos = offset + i;
      for (var j = 0; j < 3; j++) {
        this.mp3_stream.reset(pos);

        try {
          var header = MP3FrameHeader.decode(this.mp3_stream);
        } catch (e) {
          break;
        }

        // skip the rest of the frame
        const size = header.framesize();
        if (size == null) {
          break;
        }

        pos += size;
      }

      // check if we're done
      if (j === 3) {
        break;
      }
    }

    // if we didn't find 3 frames, just try the first one and hope for the best
    if (j !== 3) {
      i = 0;
    }

    this.mp3_stream.reset(offset + i);

    // if we guesstimated, update the timestamp to another estimate of where we actually seeked to
    if (this.demuxer.seekPoints.length === 0) {
      timestamp =
        (this.stream.offset / (this.format.bitrate / 8)) *
        this.format.sampleRate;
    }

    this.seeking = true;
    return timestamp;
  };
});

module.exports = MP3Decoder;

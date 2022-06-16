using System;
using System.Collections.Generic;
using System.Text;

namespace ProcessM.NET.ConformanceChecking.TokenBasedReplay
{
    /// <summary>
    /// A class used as an overlay to a place in the examined PetriNet. It stores further diagnostics information.
    /// </summary>
    class PlaceTokenDiagnosticsOverlay
    {
        public uint Tokens { get; private set; } = 0;

        public uint Produced { get; private set; } = 0;

        public uint Consumed { get; private set; } = 0;

        public uint Missing { get; private set; } = 0;

        public uint Remaining { get; private set; } = 0;

        /// <summary>
        /// Attempts to consume a token and increments the Consumed counter. If no token can be consumed, increments the Missing counter instead.
        /// </summary>
        public void ConsumeToken()
        {
            if (Tokens == 0)
            {
                Missing++;
                Produced++;
                return;
            }
            Tokens--;
            Consumed++;
        }

        /// <summary>
        /// Produces a token, increments the Produced counter.
        /// </summary>
        public void ProduceToken()
        {
            Tokens++;
            Produced++;
        }

        /// <summary>
        /// Adds the current amount of tokens as Remaining and removes all active Tokens.
        /// </summary>
        public void SetRemaining()
        {
            Remaining += Tokens;
            Tokens = 0;
        }
    }
}
